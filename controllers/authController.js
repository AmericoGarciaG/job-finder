const axios = require('axios');
const config = require('config');

exports.getLinkedInAuthURL = (req, res) => {
    const clientID = config.get('linkedin.clientID');
    const redirectURI = config.get('linkedin.redirectURI');
    const state = '123456';
    const scope = 'r_liteprofile r_emailaddress';

    const authURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}&scope=${scope}`;
    res.redirect(authURL);
};

exports.handleLinkedInCallback = async (req, res) => {
    const authorizationCode = req.query.code;
    const redirectURI = config.get('linkedin.redirectURI');

    try {
        const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
            grant_type: 'authorization_code',
            code: authorizationCode,
            redirect_uri: redirectURI,
            client_id: config.get('linkedin.clientID'),
            client_secret: config.get('linkedin.clientSecret')
        });

        const accessToken = response.data.access_token;
        req.session.accessToken = accessToken;
        res.redirect('/');
    } catch (error) {
        console.error('Error al obtener el access token:', error);
        res.status(500).send('Error al autenticar con LinkedIn');
    }
};


