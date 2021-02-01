export const routes = {
    account: {
        value: '/manage-account',
        get() {
            return '/manage-account';
        },
    },
    article: {
        value: '/article/:articleId',
        get(id) {
            return `/article/${id}`;
        },
        edit: {
            value: '/article/edit-article/:articleId',
            get(id) {
                return `/article/edit-article/${id ? id : 'new'}`;
            }
        },
        manage: {
            value: '/articles/manage',
            get() {
                return '/articles/manage';
            }
        },
    },
    default: {
        value: '/404',
        get() {
            return '/404';
        },
    },
    home: {
        value: '/',
        get() {
            return '/';
        },
    },
};