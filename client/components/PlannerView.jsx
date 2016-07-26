class PlannerView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      location: 'San Francisco',
      numDays: 3,
      events: [],
      yelpEvents: [],
      events: [], // We'll need a get request here (?) to find all events associated with the itineraryID
      selected: '',
      day: '1',
      slot: '1'
    };

    this.serverRequest = function ajax(url, data, callback) {
      // If second parameter is empty function performs a GET request
      console.log('serverRequest');
      var method = data === undefined ? 'GET' : 'POST';
      fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        method: method,
        body: JSON.stringify(data)
      }, this)
        .then(res => {
          console.log('Successful clientside POST-request');
          return res.json();
        })
        .then(json => {
          console.log(json);

          callback(json);

          return json;
        })
        .catch(err => {
          console.log(err);
        });
    }.bind(this);


    // Function that saves all events in itinerary to database on button click
    this.saveItinerary = event => {
      console.log(this);
      event.preventDefault();

      var eventsToSave = _.map(this.state.events, (e, index) => {
        var eventToSave = {
          day: (Math.floor(index / 3) + 1),
          location: this.state.location,
          name: e.name,
          slot: (index % 3),
          image: e.image,
          url: e.url,
          snippet: e.snippet,
          categories: e.categories,
          address: e.address
        };

        return eventToSave;
      });

      var data = {
        id: window.newItinerary,
        events: eventsToSave
      };

      this.serverRequest('/classes/save', data);
    };

    this.handleChange = event => {
      var newState = {};
      newState[event.target.id] = event.target.value;
      this.setState(newState);
    };

    this.swap = () => {
      var day = parseInt(this.state.day, 10) - 1;
      var slot = parseInt(this.state.slot, 10) - 1;

      var index = 3 * day + slot;
      var target = _.find(this.state.events, event => {
        return event.name === this.state.selected;
      });
      var targetIdx = _.findIndex(this.state.events, event => {
        return event.name === this.state.selected;
      });
      var newEvents = this.state.events.slice();
      var temp = newEvents[index];
      newEvents[index] = target;
      newEvents[targetIdx] = temp;
      this.setState({events: newEvents});
    };
  }

  componentWillMount() {
    var getEvents = () => {
      console.log('fromItinId', window.fromItinId);

      // Get events saved events from the database
      if (window.fromItinId) {
        this.serverRequest(
          '/classes/itineraryEvents',
          {id: window.fromItinId},
          function(data) {
            var newState = {
              events: data
            };
            that.setState(newState);
            console.log(that.state.events);
            // window.fromItinId = undefined;
          }
        );
      }

      // Get events from yelp

      this.serverRequest(
        '/classes/events',
        {location: that.state.location},
        function(data) {

          // Make the events from yelp nice
          var formattedYelp = _.map(data.eventsFromYelp, function(yelpEvent) {
            var formatted = {
              name: yelpEvent['name'],
              image: yelpEvent['image_url'],
              url: yelpEvent['url'],
              snippet: yelpEvent['snippet_text'],
              rating: yelpEvent['rating_img_url'],
              address: yelpEvent['location']['display_address'][0] + ', ' + yelpEvent['location']['display_address'][1]
            };

            formatted['categories'] = _.map(yelpEvent['categories'], function(cat) {
              return cat[0];
            }).join(', ');

            return formatted;
          });

          console.log(data.eventsFromYelp);
          console.log('Formatted Yelp: ' + formattedYelp);
          if (window.fromItinId) {
            var newState = {
              yelpEvents: formattedYelp,
              selected: formattedYelp[0].name
            }
          } else {
            var newState = {
              events: formattedYelp, 
              yelpEvents: formattedYelp,
              selected: formattedYelp[0].name
            };
          }
          console.log(newState);
          that.setState(newState);
          window.fromItinId = undefined;
        }
      );
    };

    var that = this;
    // Get itinerary
    this.serverRequest(
      '/classes/itinerary', 
      {id: window.newItinerary},
      function(data) {
        console.log(data);
        var newState = {
          location: data.location,
          numDays: data.numDays
        };
        that.setState(newState);
        getEvents();
      }
    );

  }

  render() {
    return (

      <div>

        <h4>Your trip to {this.state.location}.</h4>

        <div>
          <select onChange={this.handleChange} id="selected">
            {this.state.yelpEvents.map(event => {
               return <option>{event.name}</option>;
             })}
          </select>
          <select onChange={this.handleChange} id="day">
            {_.range(1, this.state.numDays + 1).map(day => {
               return <option>{day}</option>;
             })}
          </select>
          <select onChange={this.handleChange} id="slot">
            {_.range(1, 4).map(slot => {
               return <option>{slot}</option>;
             })}
          </select>

          <button onClick={this.swap}>Swap</button>
        </div>

        
        <div>
        {_.range(1, this.state.numDays + 1).map((day) => {
            return (<DayView day={day} events={this.state.events}/>);
          }
        )}
        </div>

        <div>
          <button onClick={this.saveItinerary}>Save Itinerary</button>
        </div>

      </div>
    );
  }

}
