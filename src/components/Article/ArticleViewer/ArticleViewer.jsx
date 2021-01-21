/* eslint-disable react/prop-types */

import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { renderCustomElement } from '../../Editor/Elements';
import { renderCustomLeaves } from '../../Editor/Leaves';

export default function ArticleViewer({ article, className, style }) {
    const editor = useMemo(() => withReact(createEditor()), []);
    return (
        <Slate
            editor={editor}
            value={article}
        >
            <Editable
                className={className}
                style={style}
                readOnly
                renderElement={renderCustomElement}
                renderLeaf={renderCustomLeaves}
            />
        </Slate>
    );
}