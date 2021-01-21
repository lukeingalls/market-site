import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Article from './components/Article/Article';
import ArticleWriter from './components/Article/AritcleWriter/ArticleWriter';
import Home from './components/Home/Home';

function App() {
    return (
        <div className="bg-light">
            <Router>
                <Header />
                <Container
                    className="bg-white border border-top-0 border-bottom-0 py-3"
                    style={{
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/create-doc">
                            <ArticleWriter />
                        </Route>
                        <Route path="/article">
                            <Article />
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </div>
    );
}

export default App;
