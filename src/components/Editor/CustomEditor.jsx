import { Editor, Element as SlateElement, Transforms } from 'slate';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const CustomEditor = {
    toggleBlock(editor, format) {
        const isActive = CustomEditor.isBlockActive(editor, format);
        const isList = LIST_TYPES.includes(format);
    
        Transforms.unwrapNodes(editor, {
            match: n =>
                LIST_TYPES.includes(
                    !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
                ),
            split: true,
        });
        const newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        };
        Transforms.setNodes(editor, newProperties);
    
        if (!isActive && isList) {
            const block = { type: format, children: [] };
            Transforms.wrapNodes(editor, block);
        }
    },
    toggleMark(editor, format) {
        const isActive = CustomEditor.isMarkActive(editor, format);
    
        if (isActive) {
            Editor.removeMark(editor, format);
        } else {
            Editor.addMark(editor, format, true);
        }
    },
    isBlockActive(editor, format) {
        const [match] = Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
        });
    
        return !!match;
    },
    isMarkActive(editor, format) {
        const marks = Editor.marks(editor);

        return marks ? marks[format] === true : false;
    },
    insertImage(editor, url) {
        const text = {text: ''};
        const image = { type: 'image', url, children: [text]};
        Transforms.insertNodes(editor, image);
    }
};