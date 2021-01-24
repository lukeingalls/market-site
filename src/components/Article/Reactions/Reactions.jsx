/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { useAuth } from '../../../contexts/FirebaseContext';
import './Reactions.scss';

const Reaction = ({
    active,
    className,
    icon,
    reaction,
    setReaction
}) => {

    const onReaction = () => setReaction(active ? '' : reaction);

    return (
        <div
            className={`
                ${active ? className : ''}
                material-icons
                reaction
            `}
            onClick={onReaction}
        >
            { icon}
        </div>
    );
};


export default function Reactions({ className }) {
    const { userDoc, updateReaction, getReaction } = useAuth();
    const [loaded, setLoaded] = useState(false);
    const [reaction, setReaction] = useState('');
    const { articleId } = useParams();

    useEffect(() => {
        if (userDoc.exists && loaded) {
            updateReaction(articleId, reaction);
        }
    }, [reaction]);

    useEffect(() => {
        let mount = true;

        getReaction(articleId)
            .then((doc) => {
                if (mount) {
                    if (doc.exists) {
                        setReaction(doc.data().reaction);
                    }
                    setLoaded(true);
                }
            });

        return () => {
            mount = false;
        };
    }, []);

    const reactionsList = [
        {
            reaction: 'like',
            icon: 'thumb_up',
            className: 'reaction--info',
        },
        {
            reaction: 'dislike',
            icon: 'thumb_down',
            className: 'reaction--danger',
        }
    ];

    return (

        <Container
            className={`
                reaction__container
                border
                ${className}
            `}
        >
            <h4 className="reaction__header">
                Rate Article
            </h4>
            <Row className="reaction__button-group">
                {reactionsList.map((r) => {
                    return (
                        <Reaction
                            active={reaction === r.reaction}
                            key={r.reaction}
                            setReaction={setReaction}
                            {...r}
                        />
                    );
                })}
            </Row>
        </Container>
    );
}
