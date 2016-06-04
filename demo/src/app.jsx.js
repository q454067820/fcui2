define(function (require) {


    var React = require('react');
    var config = require('./config');


    function menuFactory(me) {
        var doms = [];
        for (var i = 0; i < config.menu.length; i++) {
            var prop = {
                key: i + '',
                'data-level': config.menu[i].level,
                className: 'font-icon menu-item font-icon-largeable-caret-'
                    + (me.props.level !== config.menu[i].level ? 'right' : 'down'),
                onClick: me.onLevelChange
            };
            doms.push(<div {...prop}>{config.menu[i].label}</div>);
            if (me.props.level !== config.menu[i].level) continue;
            for (var j = 0; j < config.menu[i].children.length; j++) {
                var item = config.menu[i].children[j];
                if (item === '') {
                    doms.push(<hr key={i + '-' + j}/>);
                    continue;
                }
                var itemProp = {
                    key: i + '-' + j,
                    'data-demo': item,
                    className: 'list-item' + (me.props.demo === item ? ' list-item-selectd' : ''),
                    onClick: me.onDemoChange
                };
                doms.push(<div {...itemProp}>{item}</div>);
            }
        }
        return doms;
    }


    return React.createClass({
        // @override
        getDefaultProps: function () {
            return {
                level: 'base',
                demo: 'Tip',
                title: 'FCUI2 Demos',
                dispatch: function () {}
            };
        },
        // @override
        getInitialState: function () {
            return {
                message: ''
            };
        },
        onDemoChange: function (e) {
            var demo = e.target.dataset.demo;
            if (demo === this.props.demo) return;
            this.props.dispatch('changeHash', {demo: demo});
        },
        onLevelChange: function (e) {
            var level = e.target.dataset.level;
            level = level === this.props.level ? '' : level;
            this.props.dispatch('changeHash', {level: level});
        },
        changeMessage: function (str) {
            this.setState({message: str})
        },
        render: function () {
            var Demo = config.demos[this.props.demo] || config.demos['Tip'];
            return (
                <div>
                    <div className="logo">{this.props.title}</div>
                    <div className="left-container">{menuFactory(this)}</div>
                    <div className="right-top-container">{this.state.message}</div>
                    <div className="right-middle-container"><Demo alert={this.changeMessage}/></div>
                </div>
            );
        }
    });
});
