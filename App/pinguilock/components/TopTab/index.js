import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { BottomNavigation } from 'react-native-material-ui';
import FontAwesome, { Icons } from 'react-native-fontawesome';


const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
    }).isRequired,
};

class TopTab extends Component {
    constructor(props) {
        super(props);

        this.state = { active: 'key' };
    }
    componentWillUpdate
    render() {
        return (
            <BottomNavigation active={this.state.active} >
                <BottomNavigation.Action
                    key="key"
                    icon="vpn-key"
                    label="Keys"
                    onPress={() => this.setState({ active: 'key' })}
                />
                <BottomNavigation.Action
                    key="otps"
                    icon={Icons.qrcode}
                    label="OTP"
                    onPress={() => this.setState({ active: 'otps' })}
                />
                <BottomNavigation.Action
                    key="locks"
                    icon="lock"
                    label="Locks"
                    onPress={() => this.setState({ active: 'locks' })}
                />
            </BottomNavigation>
        );
    }
}

TopTab.propTypes = propTypes;

export default TopTab;