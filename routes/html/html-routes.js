const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/user.html'));
});

router.get('/thought', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/thought.html'));
});


module.exports = router;