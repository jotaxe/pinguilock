import React, { Component } from 'react'
import {getDevices, getPairs, getMQTTInfo} from '../Api/localApi';
import DeviceCard from "./deviceCard";
import PairCard from "./pairCard";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AddDeviceCard from "./addDeviceCard";
import AddPairCard from "./addPairCard";
import Divider from '@material-ui/core/Divider';
import socketApp from '../Api/localApi';

export default class Access extends Component {
  constructor(props){
    super(props);
    this.state = {
      devices: undefined,
      pairs: undefined,
      localname: undefined,
    }
  }
  componentDidMount(){
    Promise.resolve(getDevices()).then((devData) => {
      this.setState({devices: devData.data});
    })
    Promise.resolve(getPairs()).then((PairData) => {
      this.setState({pairs: PairData.data});
    })

    Promise.resolve(getMQTTInfo()).then((devData) => {
      this.setState({localname: devData.device_name});
    })

    
    socketApp.service('devices').on('created', (newDevice) => {
      this.setState((prevState) => {
        return {
          devices: prevState.devices.concat(newDevice)
        }
      })
    });
    socketApp.service('devices').on('removed', (removedDevice) => {
      this.setState((prevState) => {
        const filtered = prevState.devices.filter(obj =>  obj._id !== removedDevice._id )
        return {
          devices: filtered
        }
      })
    });

    socketApp.service('cam-lock-pair').on('created', (newPair) => {
      this.setState((prevState) => {
        return {
          pairs: prevState.pairs.concat(newPair)
        }
      })
    });
    socketApp.service('cam-lock-pair').on('removed', (removedPair) => {
      this.setState((prevState) => {
        const filtered = prevState.pairs.filter(obj =>  obj._id !== removedPair._id )
        return {
          pairs: filtered
        }
      })
    });

  }
  render() {
    const styles = {
        gridList: {
          width: 500,
          height: 450
        },
        subheader: {
          width: '100%',
        },
        addButtonGrid: {
            alignContent: "center",
            justifyContent: "center",
            display: "grid"
        }

      };

    return (
      <div>
          Access Devices
          <br/>
          <Divider/>
          <br/>
          <GridList className={styles.gridList} cols={3}>
            <GridListTile>
              <AddDeviceCard/>
            </GridListTile>
            {this.state.devices ? 
            this.state.devices.map((device) => {
                return (
                    <GridListTile key={device._id}>
                        <DeviceCard
                            device={device} 
                            localname={this.state.localname}
                            />
                    </GridListTile>
                )
            }) 
            : 
            null}
          </GridList>
          Access Pairs
          <br/>
          <Divider/>
          <br/>
          <GridList className={styles.gridList} cols={3}>
            <GridListTile>
              <AddPairCard/>
            </GridListTile>
            {this.state.pairs ? 
            this.state.pairs.map((pair) => {
              return (
                <GridListTile key={pair._id}>
                  <PairCard
                    pair={pair}
                  />
                </GridListTile>
              )
            }):
            null
            }
          </GridList>

      </div>
    )
  }
}