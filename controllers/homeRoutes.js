const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('all-posts', {
      layout: 'main',
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('single-post', {
      layout: 'main',
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/signup');
    return;
  }

  res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('all-posts-admin', {
      layout: 'dashboard',
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/new', withAuth, async (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
  try {
    // Get all posts owned by the logged in user

    const postData = await Post.findByPk(req.params.id);

    // Serialize data so the template can read it
    const post = postData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render('edit-post', {
      layout: 'dashboard',
      post,
    });
  } catch (err) {
    res.redirect('login');
  }
})

module.exports = router;
