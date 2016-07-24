'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// FIX: Hard coded the test data instead of passing in w/ props
var ItineraryView = function (_React$Component) {
  _inherits(ItineraryView, _React$Component);

  function ItineraryView(props) {
    _classCallCheck(this, ItineraryView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ItineraryView).call(this, props));
    // Equivalent to ES5's React.Component.call(this, props)


    _this.state = {
      itineraries: []
    };
    return _this;
  }

  _createClass(ItineraryView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.serverRequest = function ajax(url, data) {
        var _this2 = this;

        // If second parameter is empty function performs a GET request
        var method = data === undefined ? 'GET' : 'POST';
        fetch(url, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          method: method,
          body: JSON.stringify(data)
        }, this).then(function (res) {
          return res.json();
        }).then(function (json) {
          console.log(json);
          _this2.setState({ itineraries: json });
        }).catch(function (err) {
          console.log(err);
        });
      }.bind(this)('http://localhost:3000/classes/itineraries');
    }
  }, {
    key: 'render',
    value: function render() {
      return (
        // Add search functionality here (filter itineraries)
        React.createElement(
          'div',
          { className: 'itineraries' },
          this.state.itineraries.map(function (itinerary) {
            return React.createElement(Summary, { data: itinerary });
          })
        )
      );
    }
  }]);

  return ItineraryView;
}(React.Component);

;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9jb21wb25lbnRzL0l0aW5lcmFyeVZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtJQUNNLGE7OztBQUVKLHlCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpR0FFWCxLQUZXO0FBQ2pCOzs7QUFHQSxVQUFLLEtBQUwsR0FBYTtBQUNYLG1CQUFhO0FBREYsS0FBYjtBQUppQjtBQU9sQjs7Ozt3Q0FFbUI7QUFDbEIsV0FBSyxhQUFMLEdBQXFCLFNBQVMsSUFBVCxDQUFjLEdBQWQsRUFBbUIsSUFBbkIsRUFBeUI7QUFBQTs7QUFDNUM7QUFDQSxZQUFJLFNBQVMsU0FBUyxTQUFULEdBQXFCLEtBQXJCLEdBQTZCLE1BQTFDO0FBQ0EsY0FBTSxHQUFOLEVBQVc7QUFDVCxtQkFBUztBQUNQLHNCQUFVLGtCQURIO0FBRVAsNEJBQWdCO0FBRlQsV0FEQTtBQUtULHVCQUFhLGFBTEo7QUFNVCxrQkFBUSxNQU5DO0FBT1QsZ0JBQU0sS0FBSyxTQUFMLENBQWUsSUFBZjtBQVBHLFNBQVgsRUFRRyxJQVJILEVBU0csSUFUSCxDQVNRLGVBQU87QUFDWCxpQkFBTyxJQUFJLElBQUosRUFBUDtBQUNELFNBWEgsRUFZRyxJQVpILENBWVEsZ0JBQVE7QUFDWixrQkFBUSxHQUFSLENBQVksSUFBWjtBQUNBLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLGFBQWEsSUFBZCxFQUFkO0FBQ0QsU0FmSCxFQWdCRyxLQWhCSCxDQWdCUyxlQUFPO0FBQ1osa0JBQVEsR0FBUixDQUFZLEdBQVo7QUFDRCxTQWxCSDtBQW1CRCxPQXRCb0IsQ0FzQm5CLElBdEJtQixDQXNCZCxJQXRCYyxFQXNCUiwyQ0F0QlEsQ0FBckI7QUF1QkQ7Ozs2QkFDUTtBQUNQO0FBQ0U7QUFDQTtBQUFBO0FBQUEsWUFBSyxXQUFVLGFBQWY7QUFDRyxlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCO0FBQUEsbUJBQWEsb0JBQUMsT0FBRCxJQUFTLE1BQU0sU0FBZixHQUFiO0FBQUEsV0FBM0I7QUFESDtBQUZGO0FBTUQ7Ozs7RUEzQ3lCLE1BQU0sUzs7QUE0Q2pDIiwiZmlsZSI6Ikl0aW5lcmFyeVZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGSVg6IEhhcmQgY29kZWQgdGhlIHRlc3QgZGF0YSBpbnN0ZWFkIG9mIHBhc3NpbmcgaW4gdy8gcHJvcHNcbmNsYXNzIEl0aW5lcmFyeVZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgLy8gRXF1aXZhbGVudCB0byBFUzUncyBSZWFjdC5Db21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcylcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXRpbmVyYXJpZXM6IFtdXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2VydmVyUmVxdWVzdCA9IGZ1bmN0aW9uIGFqYXgodXJsLCBkYXRhKSB7XG4gICAgICAvLyBJZiBzZWNvbmQgcGFyYW1ldGVyIGlzIGVtcHR5IGZ1bmN0aW9uIHBlcmZvcm1zIGEgR0VUIHJlcXVlc3RcbiAgICAgIHZhciBtZXRob2QgPSBkYXRhID09PSB1bmRlZmluZWQgPyAnR0VUJyA6ICdQT1NUJztcbiAgICAgIGZldGNoKHVybCwge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcbiAgICAgIH0sIHRoaXMpXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2l0aW5lcmFyaWVzOiBqc29ufSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgIH0uYmluZCh0aGlzKSgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2NsYXNzZXMvaXRpbmVyYXJpZXMnKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIEFkZCBzZWFyY2ggZnVuY3Rpb25hbGl0eSBoZXJlIChmaWx0ZXIgaXRpbmVyYXJpZXMpXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0aW5lcmFyaWVzXCI+XG4gICAgICAgIHt0aGlzLnN0YXRlLml0aW5lcmFyaWVzLm1hcChpdGluZXJhcnkgPT4gPFN1bW1hcnkgZGF0YT17aXRpbmVyYXJ5fSAvPil9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuIl19