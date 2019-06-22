const assert = require('assert');

module.exports = (webpackageName) => {
  assert.ok(webpackageName, 'Expected "webpackageName" to be defined.')
  return {
    description: "coralbird destinations map",
    resources: [
      "element.html"
    ],
    runnables: [
      {
        "name": "SHOWROOM",
        "path": "/SHOWROOM.html"
      }
    ],
    dependencies: [
      { webpackageId: "cubx-maps@2.0.0-SNAPSHOT", artifactId: "cubx-maps-element" },
      { webpackageId: "com.incowia.ajax@1.0.0-SNAPSHOT", artifactId: "ajax-request"}
    ],
    slots: [
      // { slotId: "outerMessage", type: "string", direction: ["input", "output"] }
    ],
    // member declarations
    members: [
      { artifactId: 'cubx-maps-element', memberId: "map" },
      { artifactId: 'ajax-request', memberId: 'get-data'}
    ],
    // connection declarations
    connections: [
      {
        connectionId: "data-to-map",
        source: { 
          slot: "result",
          memberIdRef: "get-data" 
        },
        destination: { 
          slot: "markers", 
          memberIdRef: "map"
        }
      }
    ],
    inits: [
      {
        slot: 'config',
        memberIdRef: 'get-data',
        value: {
          url: 'https://getrequest.github.io/launcher.demo.coralbird-destinations-map.data-source-mocks/default-data.json',
          method: 'get'
        }
      },
      {
        slot: 'tileLayer',
        memberIdRef: 'map',
        value: {
          url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
          options: {
            attribution: "Map data &copy; &lt;a href=\"https://www.openstreetmap.org/\"&gt;OpenStreetMap&lt;/a&gt; contributors, &lt;a href=\"https://creativecommons.org/licenses/by-sa/2.0/\"&gt;CC-BY-SA&lt;/a&gt;",
            maxZoom: 18
          }
        },
      }
    ]
  };
};
