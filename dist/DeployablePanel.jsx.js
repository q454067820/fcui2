/**
 * 折叠面板
 * @author Brian Li
 * @email lbxxlht@163.com
 * @version 0.0.2.1
 */
define(function (require) {

    var React = require('react');
    var InputWidget = require('./mixins/InputWidget');
    var cTools = require('./core/componentTools');
    var language = require('./core/language').deployablePanel;
    var util = require('./core/util');
    var labels = {
        expand: language.expand,
        hide: language.hide
    };

    return React.createClass({
        /**
         * @properties
         *
         * @param {Import|Properties} src\core\componentTools.js skin className style disabled
         * @param {Object} labels 话术配置
         * @param {String} labels.expand 面板关闭后展开按钮的话术
         * @param {String} labels.hide 面板展开后关闭按钮的话术
         * @param {String} switchLocation 展开关闭按钮的位置，top或bottom
         * @param {Import|Properties} src\mixins\InputWidget.js
         *      value onChange name validations customErrorTemplates valueTemplate
         */
        /**
         * @fire Import src\mixins\InputWidget.js XXX onChange
         */
        // @override
        mixins: [InputWidget],
        // @override
        getDefaultProps: function getDefaultProps() {
            return {
                // base
                skin: '',
                className: '',
                style: {},
                disabled: false,
                // self
                labels: labels,
                switchLocation: 'top',
                // mixin
                valueTemplate: ''
            };
        },
        // @override
        getInitialState: function getInitialState() {
            return {};
        },
        onChange: function onChange(e) {
            e = { target: this.refs.container };
            e.target.value = this.___getValue___() === 'expand' ? 'hide' : 'expand';
            this.___dispatchChange___(e);
        },
        render: function render() {
            var containerProp = cTools.containerBaseProps('deployablepanel', this);
            var value = this.___getValue___();
            var labels = util.extend({}, labels, this.props.labels);
            return React.createElement(
                'div',
                containerProp,
                this.props.switchLocation === 'top' ? React.createElement(
                    'div',
                    { className: 'opt-bar' },
                    React.createElement(
                        'span',
                        { onClick: this.onChange, className: 'opt-link' },
                        value === 'expand' ? labels.hide : labels.expand
                    ),
                    React.createElement('span', { onClick: this.onChange,
                        className: 'fcui2-icon fcui2-icon-arrow-' + (value === 'expand' ? 'up' : 'down')
                    })
                ) : null,
                React.createElement(
                    'div',
                    { className: 'content-bar', style: { display: value === 'expand' ? 'block' : 'none' } },
                    this.props.children
                ),
                this.props.switchLocation !== 'top' ? React.createElement(
                    'div',
                    { className: 'opt-bar' },
                    React.createElement(
                        'span',
                        { onClick: this.onChange, className: 'opt-link' },
                        value === 'expand' ? labels.hide : labels.expand
                    ),
                    React.createElement('span', { onClick: this.onChange,
                        className: 'fcui2-icon fcui2-icon-arrow-' + (value === 'expand' ? 'up' : 'down')
                    })
                ) : null
            );
        }
    });
});