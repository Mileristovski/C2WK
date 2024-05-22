const Validator = require('validatorjs');
const helper = require('../../services/validationService')

module.exports = async (req, res, next) => {
    let data = helper.dataPass(req);

    // Schema that our data must match to
    const inputSchema = {
        Email: ['required', 'regex:/^[\' 0-9A-ZÀÂÄÇÉÈÊËÎÏÔÙÛÜa-zàâäçéèêëîïôùûü_+%#@.\\-]+$/', 'max:200'],
        Password: ['required', 'regex:/^[\' 0-9A-ZÀÂÄÇÉÈÊËÎÏÔÙÛÜa-zàâäçéèêëîïôùûü_+%#@*/^;()=?&:.-]+$/', 'max:200'],
    };

    const validation = new Validator(data, inputSchema);
    
    if (!validation.passes()) {
        // 422 : Unprocessable Entity
        return res.status(422).json({
            message: Object.values(validation.errors.all())[0],
            errors: validation.errors.all()
        });
    }
    next();
};
