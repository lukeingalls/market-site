/* eslint-disable react/prop-types */
import './Elements.scss';

const BlockQuote = ({ attributes, children }) => {
    return (
        <blockquote {...attributes}>
            {children}
        </blockquote>
    );
};

const BulletedList = ({ attributes, children }) => {
    return (
        <ul {...attributes}>
            {children}
        </ul>
    );
};

const HeadingOne = ({ attributes, children }) => {
    return (
        <h1 {...attributes}>
            {children}
        </h1>
    );
};

const HeadingTwo = ({ attributes, children }) => {
    return (
        <h2 {...attributes}>
            {children}
        </h2>
    );
};

const Image = ({ attributes, children, element }) => {
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img src={element.url} style={{
                    maxWidth: '100%',
                }} />
            </div>
            { children }
        </div>
    );
};

const ListItem = ({ attributes, children }) => {
    return (
        <li {...attributes}>
            {children}
        </li>
    );
};

const NumberedList = ({ attributes, children }) => {
    return (
        <ol {...attributes}>
            {children}
        </ol>
    );
};

const DefaultElement = ({ attributes, children }) => {
    return (
        <p {...attributes}>
            {children}
        </p>
    );
};

export const renderCustomElement = (props) => {
    switch (props.element.type) {
        case 'block-quote':
            return <BlockQuote {...props} />;
        case 'bulleted-list':
            return <BulletedList {...props} />;
        case 'heading-one':
            return <HeadingOne {...props} />;
        case 'heading-two':
            return <HeadingTwo {...props} />;
        case 'image':
            return <Image {...props} />;
        case 'list-item':
            return <ListItem {...props} />;
        case 'numbered-list':
            return <NumberedList {...props} />;
        default:
            return <DefaultElement {...props} />;
    }
};
