/* eslint-disable react/prop-types */
// TODO: Add support for images
import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { renderCustomElement } from './Elements';
import { renderCustomLeaves } from './Leaves';
import { CustomEditor } from './CustomEditor';
import { Button, Icon } from './components';
import { Card } from 'react-bootstrap';

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
};

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={CustomEditor.isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                CustomEditor.toggleBlock(editor, format);
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    );
};

const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={CustomEditor.isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                CustomEditor.toggleMark(editor, format);
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    );
};

export default function DocumentEditor() {
    // TODO: Support multiple cached docs
    const [value, setValue] = useState(JSON.parse(localStorage.getItem('content')) || initialValue);
    const renderElement = useCallback(props => renderCustomElement(props), []);
    const renderLeaf = useCallback(props => renderCustomLeaves(props), []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Slate editor={editor} value={value} onChange={(value) => {
            setValue(value);
            const content = JSON.stringify(value);
            // TODO: Support multiple cached docs
            localStorage.setItem('content', content);
        }}>
            <Card>
                <Card.Header>
                    <MarkButton format="bold" icon="format_bold" />
                    <MarkButton format="italic" icon="format_italic" />
                    <MarkButton format="underline" icon="format_underlined" />
                    <MarkButton format="code" icon="code" />
                    <BlockButton format="heading-one" icon="looks_one" />
                    <BlockButton format="heading-two" icon="looks_two" />
                    <BlockButton format="block-quote" icon="format_quote" />
                    <BlockButton format="numbered-list" icon="format_list_numbered" />
                    <BlockButton format="bulleted-list" icon="format_list_bulleted" />
                </Card.Header>
                <Card.Body>
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Enter some rich text…"
                        spellCheck
                        autoFocus
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault();
                                    const mark = HOTKEYS[hotkey];
                                    CustomEditor.toggleMark(editor, mark);
                                }
                            }
                        }}
                    />
                </Card.Body>
            </Card>
        </Slate>
    );
}

const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<textarea>', code: true },
            { text: '!' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    'Since it\'s rich text, you can do things like turn a selection of text ',
            },
            { text: 'bold', bold: true },
            {
                text:
                    ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'block-quote',
        children: [{ text: 'A wise quote.' }],
    },
    {
        type: 'paragraph',
        children: [{ text: 'Try it out for yourself!' }],
    },
];