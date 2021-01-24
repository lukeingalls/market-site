import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Article from './components/Article/Article';
import ArticleWriter from './components/Article/AritcleWriter/ArticleWriter';
import Home from './components/Home/Home';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { routes } from './routes';
import AuthorRoute from './components/Routes/AuthorRoute';
import AccountManage from './components/Account/AccountManage/AccountManage';

function App() {
    return (
        <div className="bg-light">
            <FirebaseProvider>
                <Router>
                    <Header />
                    <Container
                        className="bg-white border border-top-0 border-bottom-0 py-3"
                        style={{
                            minHeight: 'calc(100vh - 64px)',
                        }}
                    >
                        <Switch>
                            <Route path={routes.home.value} exact>
                                <Home />
                            </Route>
                            <AuthorRoute path={routes.newArticle.value} exact>
                                <ArticleWriter />
                            </AuthorRoute>
                            <Route path={routes.article.value} exact>
                                <Article />
                            </Route>
                            <Route path={routes.account.value} exact>
                                <AccountManage />
                            </Route>
                        </Switch>
                    </Container>
                </Router>
            </FirebaseProvider>
        </div>
    );
}

export default App;
