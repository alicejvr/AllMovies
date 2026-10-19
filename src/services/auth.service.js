import api from '../api.js'

const API_URL = 'http://localhost:8000';

class AuthService {
    login(user) {
        return api.post('/api/auth', {
            email: user.email,
            password: user.password
        })

            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    signup(user) {
        return api.post('/api/users', {
            username: user.username,
            email: user.email,
            plainPassword: user.plainPassword
        });
    }

}

export default new AuthService();
// https://www.linkedin.com/pulse/setting-up-secure-authentication-system-vuejs-aman-yerpude-aj0df/

