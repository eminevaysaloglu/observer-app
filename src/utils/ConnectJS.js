/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright (C) 2021 Terra Yazılım Bilişim Hiz. Elek. Dan. Oto. ve Loj. Tic. Ltd. Şti. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 *
 * Written by M.Çağrı Tepebaşılı <cagritepebasili@protonmail.com>, September 2021
 */

// noinspection JSUnresolvedFunction,JSUnresolvedVariable,SpellCheckingInspection

/**
 * @author M.Çağrı Tepebaşılı <cagritepebasili@protonmail.com>
 * @version 0.8.32
 * @since 0.0.1
 */
const YerlemConnectJS = (function () {

  const WebSocket = {
    Url: null,
    Username: null,
    Password: null,
    Subscriptions: null,
    Broker: null,
  }

  const Leaflet = {
    MapInitialized: false,
    ResponsivePopupEnabled: true,
    Map: null,
    ElementId: 'leafletmap',
    CenterCoordinate: [37.93382, 32.50223],
    Zoom: 10,
    Tilelayer: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    BlueMarkerIcon: 'https://i.hizliresim.com/90q2i5e.png',
    RedMarkerIcon: 'https://i.hizliresim.com/7x52u1w.png',
    MarkerMap: [],
    Cluster: null,
    AcceptableDevices: [],
    AcceptableDevicesByIgnition: null,
    AcceptableDevicesMaxSpeedLimit: null,
    InitLeaflet: (ElementId, Center, Zoom, Tilelayer) => {
      const $ElementId = ElementId ? ElementId : Leaflet.ElementId
      const $CenterCoordinate = Center ? Center : Leaflet.CenterCoordinate
      const $Zoom = Zoom ? Zoom : Leaflet.Zoom
      const $TileLayer = Tilelayer ? Tilelayer : Leaflet.Tilelayer

      Leaflet.Map = L.map($ElementId).setView($CenterCoordinate, $Zoom);
      L.tileLayer($TileLayer).addTo(Leaflet.Map);
      this.MapInitialized = true

      return Leaflet.Map
    },
  };

  function IsAcceptable(GeoLocation) {
    let DeviceKey = GeoLocation.deviceKey;
    if (Leaflet.AcceptableDevices.length === 0 && Leaflet.AcceptableDevicesByIgnition === 'each' && !Leaflet.AcceptableDevicesMaxSpeedLimit) {
      return true;
    }

    // Sadece kontak açık mı kapalı mı
    if (Leaflet.AcceptableDevices.length === 0 && Leaflet.AcceptableDevicesByIgnition !== 'each' && !Leaflet.AcceptableDevicesMaxSpeedLimit) {
      if (((Leaflet.AcceptableDevicesByIgnition === 'open') === GeoLocation.engineOn || (Leaflet.AcceptableDevicesByIgnition === 'off') !== GeoLocation.engineOn))
        return true
    }

    //Sadece Max Hız 
    //if(Leaflet.AcceptableDevices.length === 0 && Leaflet.AcceptableDevicesByIgnition === 'each' && Leaflet.AcceptableDevicesMaxSpeedLimit)

    //Sadece deviceKey
    if (Leaflet.AcceptableDevices.length !== 0 && Leaflet.AcceptableDevicesByIgnition === 'each' && !Leaflet.AcceptableDevicesMaxSpeedLimit) {
      for (const Key in Leaflet.AcceptableDevices) {
        if (Leaflet.AcceptableDevices[Key] === DeviceKey) {
          return true
        }
      }
    }

    // deviceKey + Kontak
    if (Leaflet.AcceptableDevices.length !== 0 && Leaflet.AcceptableDevicesByIgnition !== 'each' && !Leaflet.AcceptableDevicesMaxSpeedLimit) {
      for (const Key in Leaflet.AcceptableDevices) {
        if (Leaflet.AcceptableDevices[Key] === DeviceKey && ((Leaflet.AcceptableDevicesByIgnition === 'open') === GeoLocation.engineOn || (Leaflet.AcceptableDevicesByIgnition === 'off') !== GeoLocation.engineOn)) {
          return true
        }
      }
    }


    return false
  }

  function AddPolyline(Data) {
    const $CoordinateArray = Data.split(":")

    let $PolylineCoordinates = []

    $CoordinateArray.forEach(function (item, index, array) {
      const $CoordinateParts = item.split(",")
      const $Latitude = $CoordinateParts[0];
      const $Longitude = $CoordinateParts[1];

      $PolylineCoordinates.push([$Latitude, $Longitude])
    })

    L.polyline($PolylineCoordinates).addTo(Leaflet.Map);
  }

  function CreateMarker(GeoLocation) {
    let $DeviceKey = GeoLocation.deviceKey;

    if (IsAcceptable(GeoLocation)) {
      let $Marker = DecodeMarker(GeoLocation)
      MapUtil.Set(Leaflet.MarkerMap, $DeviceKey, $Marker)
    }
  }

  function UpdateMarker(GeoLocation) {
    let $DeviceKey = GeoLocation.deviceKey;

    if (IsAcceptable($DeviceKey)) {
      let marker = MapUtil.GetValue(Leaflet.MarkerMap, $DeviceKey)
      if (GeoLocation.latitude && GeoLocation.longitude) {
        marker.setLatLng([GeoLocation.latitude, GeoLocation.longitude])
      }

      let $PopupContent = DecodePopup(GeoLocation)
      marker.bindPopup($PopupContent)
    }
  }

  function DecodeMarker(GeoLocation) {
    if (GeoLocation.latitude && GeoLocation.longitude) {
      let $PopupContent = DecodePopup(GeoLocation)
      let $MarkerIcon

      if (GeoLocation.engineOn) {
        $MarkerIcon = L.icon({
          iconUrl: Leaflet.BlueMarkerIcon
        })
      } else {
        $MarkerIcon = L.icon({
          iconUrl: Leaflet.RedMarkerIcon
        })
      }

      if (Leaflet.ResponsivePopupEnabled) {
        let marker = L.marker([GeoLocation.latitude, GeoLocation.longitude], { icon: $MarkerIcon })
          //.addTo(Leaflet.Map)
          .bindPopup(L.responsivePopup().setContent($PopupContent));

        if (Leaflet.Cluster) {
          Leaflet.Cluster.addLayer(marker)
        } else {
          marker.addTo(Leaflet.Map)
        }

        return marker;
      } else {
        let marker = L.marker([GeoLocation.latitude, GeoLocation.longitude], { icon: $MarkerIcon })
          //.addTo(Leaflet.Map)
          .bindPopup($PopupContent);

        if (Leaflet.Cluster) {
          Leaflet.Cluster.addLayer(marker)
        } else {
          marker.addTo(Leaflet.Map)
        }

        return marker;
      }
    }
  }

  function DecodePopup(GeoLocation) {
    let content = ''
    if (GeoLocation.deviceKey) {
      content += '<p><strong>Cihaz No: </strong>' + GeoLocation.deviceKey + '<br/>'
    }

    if (GeoLocation.vehiclePlate) {
      content += '<p><strong>Plaka: </strong>' + GeoLocation.vehiclePlate + '<br/>'
    }

    if (typeof GeoLocation.engineOn !== 'undefined') {
      content += '<p><strong>Kontak : </strong>'
      if (GeoLocation.engineOn) {
        content += 'Açık' + '<br/>'
      } else {
        content += 'Kapalı' + '<br/>'
      }
    }

    if (GeoLocation.lastEngineActivity) {
      content += '<p><strong>Son Kontak Hareketi: </strong>' + GeoLocation.lastEngineActivity + '<br/>'
    }

    if (GeoLocation.localDateTime) {
      content += '<p><strong>Tarih: </strong>' + GeoLocation.localDateTime + '<br/>'
    }

    if (GeoLocation.lastActivity) {
      content += '<p><strong>Son Etkinlik: </strong>' + GeoLocation.lastActivity + '<br/>'
    }

    if (GeoLocation.latitude && GeoLocation.longitude) {
      let $Coordinate = GeoLocation.latitude + "" + GeoLocation.longitude
      if (GeoLocation.altitude) {
        $Coordinate += "," + GeoLocation.altitude;
      }
      content += '<p><strong>Koordinat: </strong>' + $Coordinate + '<br/>'
    }

    if (GeoLocation.distance) {
      content += '<p><strong>Mesafe: </strong>' + GeoLocation.distance + '<br/>'
    }

    if (GeoLocation.speed) {
      content += '<p><strong>Hız: </strong>' + GeoLocation.speed + '<br/>'
    }

    if (GeoLocation.course) {
      content += '<p><strong>Açı: </strong>' + GeoLocation.course + '<br/>'
    }

    if (GeoLocation.satellites) {
      content += '<p><strong>Uydu Kullanım: </strong>' + GeoLocation.satellites + '<br/>'
    }

    content += '</p>'
    return content
  }

  const MapUtil = {
    Has: function (map, element) {
      return (map && map[element]);
    },

    Set: function (map, key, value) {
      return map[key] = value;
    },

    Foreach: function (object, callback) {
      for (const property in object) {
        if (object.hasOwnProperty(property)) {
          callback(property, object[property]);
        }
      }
    },

    GetKey: function (map, value) {
      for (const prop in map) {
        if (map.hasOwnProperty(prop)) {
          if (map[prop] === value)
            return prop;
        }
      }
    },

    GetValue: function (map, key) {
      return map[key]
    },

    JsonToMap: function (json) {
      const $json = JSON.parse(json);
      const literal = {};

      for (const key in $json) {
        literal[key] = $json[key];
      }

      return literal;
    }
  };

  const TextUtil = {
    IsString: function (property) {
      return (typeof (property) === 'string') || (property instanceof String);
    },

    OrElse: function (text, arg) {
      return (text) ? text : ((arg) ? arg : "Bilgi Bulunamadı")
    },
  };

  return {
    Sync: () => {
      if (!Leaflet.MapInitialized) {
        //Leaflet.InitLeaflet()
        // fixme inits twice
      }

      if (WebSocket.Url && WebSocket.Username && WebSocket.Password) {
        const SockJsAdapter = new SockJS(WebSocket.Url);
        const StompClient = Stomp.over(SockJsAdapter);
        StompClient.connect({ login: WebSocket.Username, passcode: WebSocket.Password }, function (frame) {
          StompClient.subscribe(WebSocket.Broker, function (event) {
            let JsonData = JSON.parse(event.body);
            if (Array.isArray(JsonData)) {
              for (let i = 0; i < JsonData.length; i++) {
                const GeoLocation = JsonData[i];
                if (MapUtil.Has(Leaflet.MarkerMap, GeoLocation.deviceKey)) {
                  UpdateMarker(GeoLocation)
                } else {
                  CreateMarker(GeoLocation)
                }
              }
            } else {
              if (MapUtil.Has(Leaflet.MarkerMap, JsonData.deviceKey)) {
                UpdateMarker(JsonData)
              } else {
                CreateMarker(JsonData)
              }
            }
          });

          if (Leaflet.Cluster) {
            Leaflet.Map.addLayer(Leaflet.Cluster);
          }
        });
        StompClient.debug = null

        return StompClient
      } else {
        throw new Error("Check url,uname,password,broker.")
      }
    },

    SetAcceptableDevices: (DEVICES) => {
      Leaflet.AcceptableDevices = DEVICES
    },

    SetAcceptableDevicesByIgnition: (ignition) => {
      Leaflet.AcceptableDevicesByIgnition = ignition
    },

    SetAcceptableDevicesMaxSpeedLimit: (maxSpeedLimit) => {
      Leaflet.AcceptableDevicesMaxSpeedLimit = maxSpeedLimit
    },

    InitLeaflet: Leaflet.InitLeaflet,

    SetLeafletMap: (MAP) => {
      Leaflet.Map = MAP
    },

    GetLeafletMap: () => {
      return Leaflet.Map
    },

    EnableResponsivePopup: () => {
      Leaflet.ResponsivePopupEnabled = true
    },

    DisableResponsivePopup: () => {
      Leaflet.ResponsivePopupEnabled = false
    },

    EnablePolylineMeasure: () => {
      let polylineMeasure = L.control.polylineMeasure({
        showBearings: true,
        measureControlTitleOn: 'Uzunluk Ölçümünü Aktive Et.',
        measureControlTitleOff: 'Uzunluk Ölçümünü Deaktive Et.',
        clearMeasurementsOnStop: false,
        showMeasurementsClearControl: true,
        clearControlTitle: 'Ölçümleri Temizle.',
        bearingTextIn: 'In',             // language dependend label for inbound bearings
        bearingTextOut: 'Out',          // language dependend label for outbound bearings
        tooltipTextFinish: 'Click to <b>finish line</b><br>',
        tooltipTextDelete: 'Press SHIFT-key and click to <b>delete point</b>',
        tooltipTextMove: 'Click and drag to <b>move point</b><br>',
        tooltipTextResume: '<br>Press CTRL-key and click to <b>resume line</b>',
        tooltipTextAdd: 'Press CTRL-key and click to <b>add point</b>',
      }).addTo(Leaflet.Map)
    },

    EnableCluster: () => {
      Leaflet.Cluster = L.markerClusterGroup()
    },

    EnableZoomBox: () => {
      Leaflet.Map.addControl(L.control.zoomBox({ modal: true }))
    },

    EnableGeoman: () => {
      Leaflet.Map.pm.addControls({
        position: 'topleft',
      });
    },

    SetWebSocketUrl: (URL) => {
      WebSocket.Url = URL
    },

    SetWebSocketUsername: (USERNAME) => {
      WebSocket.Username = USERNAME
    },

    SetWebSocketPassword: (PASSWORD) => {
      WebSocket.Password = PASSWORD
    },

    SetWebSocketBroker: (BROKER) => {
      WebSocket.Broker = BROKER
    },

    AddPolyline: (DATA) => {
      AddPolyline(DATA)
    }
  }
});

export default YerlemConnectJS