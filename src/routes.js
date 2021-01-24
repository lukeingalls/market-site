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
    newArticle: {
        value: '/new-article',
        get() {
            return '/new-article';
        },
    },
};