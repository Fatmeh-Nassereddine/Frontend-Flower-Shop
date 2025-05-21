import React from 'react';
import PropTypes from 'prop-types';

export function Card({ children, className = '' }) {
    return (
        <div className={`bg-white shadow-lg rounded-2xl p-4 ${className}`}>
            {children}
        </div>
    );
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export function CardContent({ children, className = '' }) {
    return (
        <div className={`p-4 ${className}`}>
            {children}
        </div>
    );
}

CardContent.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export function Button({ children, onClick, className = '', type = 'button' }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-brown-700 hover:bg-brown-800 text-white py-3 px-6 rounded-md transition-all ${className}`}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
