
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';

import Loader from 'ui/Loader';
import AudioPlayer from 'components/AudioPlayer';
import Menu from 'components/Menu';
import Playing from 'components/Playing';

const classes = {
    container: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
    }
};

@inject(stores => ({
    initialized: stores.me.initialized,
    init: async() => {
        await stores.preferences.init();
        await stores.me.init();
    },
    hasLogin: stores.me.hasLogin,
}))
@observer
class Layout extends Component {
    async componentWillMount() {
        await this.props.init();
    }

    render() {
        var { classes, initialized } = this.props;

        // Wait for app has initialized
        if (!initialized) {
            return <Loader show={true} />;
        }

        return (
            <div
                className={classes.container}
                ref="container">
                <div>
                    {this.props.children}
                </div>

                <Menu />
                <Playing />
                <AudioPlayer />
            </div>
        );
    }
}

export default injectSheet(classes)(Layout);
