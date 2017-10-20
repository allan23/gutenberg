/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {concatChildren} from '@wordpress/element';
import {PanelBody} from '@wordpress/components';

import {registerBlockType} from '../../api';
import Editable from '../../editable';

const el = wp.element.createElement,
    blockStyle = {backgroundColor: '#fff', color: '#ccc', padding: '10px', border: '1px solid #ccc'};

registerBlockType('core/search-box', {
    title: 'Search Box',

    icon: 'search',

    category: 'widgets',

    supportHTML: false,

    attributes: {
        placeholder: {
            type: 'string',
            default: 'Write placeholder...',
        },
    },
    edit: function (props) {
        const placeholder = props.attributes.placeholder,
            focus = props.focus;

        function onChangePlaceholder(newPlaceholder) {
            props.setAttributes({placeholder: newPlaceholder});
        }

        return el(
            Editable,
            {
                className: props.className,
                onChange: onChangePlaceholder,
                value: placeholder,
                focus: focus,
                onFocus: props.setFocus,
                style: blockStyle,
            });
    },

    save: function (props) {
        const placeholder = props.attributes.placeholder;

        return el(
            'form', {
                action: '/',
                method: 'get',
            },
            el('input', {
                name: 's',
                placeholder: placeholder,
            }),
            el('button',
                {type: 'submit'}, 'Search'
            ),
        );
    },
});