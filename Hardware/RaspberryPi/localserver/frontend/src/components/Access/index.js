import React, { Component } from 'react'
import {getDevices, getPairs, getMQTTInfo} from '../Api/localApi';
import DeviceCard from "./deviceCard";
import PairCard from "./pairCard";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AddDeviceCard from "./addDeviceCard";
import AddPairCard from "./addPairCard";
import Divider from '@material-ui/core/Divider';

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