import { Router } from 'express';
const router = Router();
import User from '../models/user.model.js';
import Movie from '../models/movie.model.js';
import Review from '../models/review.model.js';
import Friendship from '../models/friendship.model.js';
import Jsonwebtoken from 'jsonwebtoken';
import JWT_SECRET from '../app.js';
import verifyToken from '../middlewares/auth.middleware.js';

router.get('/', async (req, res) => {
    try {
        const token = req.cookies.token;
        var isLogin = false;
        var isAdmin = false;
        var user;
        if(token){
            const decoded = Jsonwebtoken.verify(token, JWT_SECRET);
            const userId = decoded.userId;
            user = await User.findById(userId);
            isLogin = userId ? true: false;
            isAdmin = user.role == 'admin' ? true: false;
        }

        const movies = await Movie.find({});
        res.render('index', {
            subject: 'MovieReview - HomePage',
            movies: movies,
            isLogin: isLogin,
            isAdmin: isAdmin,
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

router.get('/logout', async (req, res) => {
    res.clearCookie('token');
    res.redirect('/pages')
})

router.get('/login', async (req, res) => {
    res.render('login', {
        subject: 'MovieReview - Login'
    });
})

router.get('/signup', async (req, res) => {
    res.render('signup', {
        subject: 'MovieReview - Signup'
    });
})

router.get('/movie/:id', async (req, res) => {
    try {
        const token = req.cookies.token;
        var isLogin = false;
        var isAdmin = false;
        var user;
        if(token){
            const decoded = Jsonwebtoken.verify(token, JWT_SECRET);
            const userId = decoded.userId;
            user = await User.findById(userId);
            isLogin = userId ? true: false;
            isAdmin = user.role == 'admin' ? true: false;
        }

        const movie = await Movie.findById(req.params.id);
        // const user = await User.findById(movie.user);
        const reviews = await Review.find({ movie: movie, status: 'approved' });
        const users = [];
        for (let i = 0; i < reviews.length; i++) {
            users[i] = await User.findById(reviews[i].user)     
        }
        res.render('movie', {
            subject: 'MovieReview - ',
            movie: movie,
            reviews: reviews,
            users: users,
            isLogin: isLogin,
            isAdmin: isAdmin,
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        const isLogin = user ? true : false;
        const isAdmin = user.role == 'admin' ? true: false;
        const reviews = await Review.find({ user: user });
        res.render('profile', {
            subject: 'MovieReview - ',
            reviews: reviews,
            user: user,
            isLogin: isLogin,
            isAdmin: isAdmin
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/profile/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const from = await User.findById(userId);
        const to = await User.findById(req.params.id);
        const friendship = await Friendship.find({ from: from, to: to });
        const isFriend = friendship.length ? true : false;
        const isLogin = userId ? true : false;
        const isAdmin = user.role == 'admin' ? true: false;
        const reviews = await Review.find({ user: to });
        res.render('profile_id', {
            subject: 'MovieReview - ',
            reviews: reviews,
            user: to,
            isLogin: isLogin,
            isFriend: isFriend,
            isAdmin: isAdmin
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/feed', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        const isLogin = user ? true : false;
        const isAdmin = user.role == 'admin' ? true: false;
        const friendships = await Friendship.find({ from: user });
        var friends = [];
        friendships.forEach(frienship => {
            friends.push(frienship.to);
        });
        var reviews = await Review.find({ user: { $in: friends } }).sort({ createdAt: -1 });
        res.render('feed', {
            subject: 'MovieReview - ',
            reviews: reviews,
            user: user,
            isLogin: isLogin,
            isAdmin: isAdmin
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/friends', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        const isLogin = user ? true : false;
        const isAdmin = user.role == 'admin' ? true: false;
        const friendships = await Friendship.find({ from: user });
        var friends = [];
        friendships.forEach(frienship => {
            friends.push(frienship.to);
        });
        var friends_user = await User.find({ _id: { $in: friends } });
        res.render('friends', {
            subject: 'MovieReview - ',
            user: user,
            isLogin: isLogin,
            friends: friends_user,
            isAdmin: isAdmin
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router;