const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const ctrl = require('../controllers/taskController');

// Apply auth middleware to all routes
router.use(auth);

router.post('/', ctrl.createTask);
router.get('/', ctrl.getTasks);
router.put('/:id', ctrl.updateTask);
router.delete('/:id', ctrl.deleteTask);

module.exports = router;