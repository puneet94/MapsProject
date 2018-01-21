/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps';
var {height, width} = Dimensions.get('window');

class MyListItem extends React.PureComponent {
  _onPress = () => {
	this.props.onPressItem(this.props.id);
  };

  render() {
	
	return (
	  <TouchableOpacity onPress={this._onPress}>


		<View style={{borderColor:"black",borderWidth:2,backgroundColor:"red",margin:10,width:250,flex:0.8,alignItems:"center",justifyContent:"center"}}>
		  <Text style={{ color: "white" }}>
			{this.props.title}
		  </Text>
		</View>
	  </TouchableOpacity>
	);
  }
}

export default class App extends React.PureComponent {
  constructor(props){
	super(props);

	this.state = {
	  data: [
		{
		  id:1,
		  title: "hello",
		  latitude: 51.831409, 
		  longitude: 9.874098
		},
		{
		  id:2,
		  title: "hello2",
		  latitude: 51.831754,
		  longitude: 9.873884
		},
		{
		  id:3,
		  title: "hello3",
		  latitude: 51.831123,
		  longitude: 9.873789
		},
		{
		  id:4,
		  title: "hello4",
		  latitude: 51.831456,
		  longitude: 9.873123
		},{
		  id:5,
		  title: "hello5",
		  latitude: 51.831852,
		  longitude: 9.873963
		},
	  ],
	  selectedId: null
	} 
	this.viewabilityConfig = {viewAreaCoveragePercentThreshold: 50};
	this.markersIndex = {};
  }
  checkSelectedId = (id)=> (id===this.state.selectedId);
  _renderItem = ({item}) => (
	<MyListItem
	  id={item.id}
	  onPressItem={this._onPressItem}
	  title={item.title}
	/>
  );
  _keyExtractor = (item, index) => item.id;
  _onPressItem = (id) => {
	// updater functions are preferred for transactional updates
	this.setState({
	  selectedId: id
	});
  };
  handleViewableItemsChanged = ({ viewableItems, changed }) => {
	
	 const  selectedId =  viewableItems[0].item.id;
	  this.setState({
		selectedId
	  });

	  this.markersIndex[viewableItems[0].index].showCallout();
  }
  markerClick = (id,index)=>{
	  
	  this.flatListRef.scrollToIndex({animated: true, index});
	  
  }

  render() {
	
	return (
	  <View style={styles.container}>
		<MapView
		  style={styles.map}
		  region={{
			latitude: 51.831852,
			longitude: 9.873963,
			latitudeDelta: 0.003,
			longitudeDelta: 0.003,
		  }}
		>
		{this.state.data.map((marker,index) => (
			
		  <MapView.Marker
				key={marker.id}
				onPress={() => this.markerClick(marker.id,index)}
				ref={ref => { this.markersIndex[index] = ref; }}
			coordinate={{
			latitude: marker.latitude,
			longitude: marker.longitude}}

	  pinColor={this.checkSelectedId(marker.id)?"green":"blue"}
	  title={marker.title}
	  description={marker.description}
	  
	>
	
	</MapView.Marker>
  ))}

		</MapView>
		<View style={{position:"absolute",bottom:0,width:width,height:150}}>
		  <FlatList
		  ref={(ref) => { this.flatListRef = ref; }}
		  onViewableItemsChanged={this.handleViewableItemsChanged}
					viewabilityConfig={this.viewabilityConfig}
		  
		data={this.state.data}
		horizontal={true}
		extraData={this.state}
		keyExtractor={this._keyExtractor}
		renderItem={this._renderItem}
	  />
		</View>
	  </View>
	);
  }
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#F5FCFF',
  },
  map: {
	...StyleSheet.absoluteFillObject,
  },
  welcome: {
	fontSize: 20,
	textAlign: 'center',
	margin: 10,
  },
  instructions: {
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
  },
});
