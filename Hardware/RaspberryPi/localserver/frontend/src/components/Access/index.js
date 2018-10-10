import React, { Component } from 'react'
import {getAdmin, getDevices, getPairs} from '../Api/localApi';
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
      admin: undefined,
      devices: undefined,
      pairs: undefined
    }
  }
  componentDidMount(){
    Promise.all(getAdmin()).then((adminData) => {
      this.setState({
        admin: adminData.email
      })
    }).catch(() => {
      alert("Admin not set")
    }).then( () => {
      Promise.resolve(getDevices()).then((devData) => {
        this.setState({devices: devData.data});
      })
    }).then(() => {
      Promise.resolve(getPairs()).then((PairData) => {
        this.setState({pairs: PairData.data});
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

    const {devices, pairs} = this.state;
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
            {devices ? 
            devices.map((device) => {
                return (
                    <GridListTile key={device._id}>
                        <DeviceCard
                            device={device} 
                            localname="local_server0"
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
            {pairs ? 
            pairs.map((pair) => {
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