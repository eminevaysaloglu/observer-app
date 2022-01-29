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

import YerlemConnectJS from "./ConnectJS";

/**
 * @author M.Çağrı Tepebaşılı <cagritepebasili@protonmail.com>
 * @version 0.9.23-2
 * @since 0.0.1
 */
const ConnectJs = (function () {

    const polylineMeasure = {
        showBearings: true,
        measureControlTitleOn: 'Uzunluk Ölçümünü Aktive Et.',
        measureControlTitleOff: 'Uzunluk Ölçümünü Deaktive Et.',
        clearMeasurementsOnStop: false,
        showMeasurementsClearControl: true,
        clearControlTitle: 'Ölçümleri Temizle.',
        bearingTextIn: 'In',             // language dependent label for inbound bearings
        bearingTextOut: 'Out',          // language dependent label for outbound bearings
        tooltipTextFinish: 'Click to <b>finish line</b><br>',
        tooltipTextDelete: 'Press SHIFT-key and click to <b>delete point</b>',
        tooltipTextMove: 'Click and drag to <b>move point</b><br>',
        tooltipTextResume: '<br>Press CTRL-key and click to <b>resume line</b>',
        tooltipTextAdd: 'Press CTRL-key and click to <b>add point</b>',
    }

    const geoman = {
        position: 'topleft',
        drawMarker: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawPolygon: false
    }

    const mapOptions = {
        responsivePopupEnabled: false,
        geomanEnabled: false,
        polylineMeasureEnabled: false,
        markerClusterEnabled: false,
        zoomBoxEnabled: false,
        mobileViewEnabled: false,
        filterEnabled: true,
        elementId: 'leafletmap',
        coordinate: [37.93382, 32.50223],
        zoom: 10,
        tilelayer: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    }

    const websocket = {
        url: null,
        username: null,
        password: null,
        subscriptions: null,
        broker: null
    }

    const context = {
        markerMap: [],
        markerCluster: null,
        map: null,
        filteredDevices: [],
        filteredByIgnition: [],
        filteredByMaxSpeed: [],
        predicates: [],
    };

    function isFilteredDeprecated(deviceId) {
        if (context.filteredDevices.length === 0) {
            return true;
        }

        for (const id in context.filteredDevices) {
            if (context.filteredDevices[id] === deviceId) {
                return true
            }
        }

        return false
    }

    function isFiltered(GeoLocation) {

        // kalkmalı
        if (!mapOptions.filterEnabled) {
            if (context.filteredDevices.length === 0) {
                return true;
            }
        }

        let DeviceKey = GeoLocation.deviceKey;
        if (context.filteredDevices.length === 0 && context.filteredByIgnition === 'each' && !context.filteredByMaxSpeed) {
            return true;
        }

        // Sadece kontak açık mı kapalı mı
        if (context.filteredDevices.length === 0 && context.filteredByIgnition !== 'each' && !context.filteredByMaxSpeed) {
            if (((context.filteredByIgnition === 'open') === GeoLocation.engineOn || (context.filteredByIgnition === 'off') !== GeoLocation.engineOn))
                return true
        }

        //Sadece Max Hız
        //if(Leaflet.AcceptableDevices.length === 0 && Leaflet.AcceptableDevicesByIgnition === 'each' && Leaflet.AcceptableDevicesMaxSpeedLimit)

        //Sadece deviceKey
        if (context.filteredDevices.length !== 0 && context.filteredByIgnition === 'each' && !context.filteredByMaxSpeed) {
            for (const Key in context.filteredDevices) {
                if (context.filteredDevices[Key] === DeviceKey) {
                    return true
                }
            }
        }

        // deviceKey + Kontak
        if (context.filteredDevices.length !== 0 && context.filteredByIgnition !== 'each' && context.filteredByMaxSpeed) {
            for (const Key in context.filteredDevices) {
                if (context.filteredDevices[Key] === DeviceKey && ((context.filteredByIgnition === 'open') === GeoLocation.engineOn || (context.filteredByIgnition === 'off') !== GeoLocation.engineOn)) {
                    return true
                }
            }
        }


        return false
    }

    function addPolyline(data) {
        const array = data.split(":")
        let coordinates = []
        array.forEach(function(item, index, array) {
            if (item) {
                const coords = item.split(",")
                const latitude = coords[0];
                const longitude = coords[1];

                if (latitude && longitude) {
                    coordinates.push([latitude, longitude])
                }
            }
        })

        L.polyline(coordinates).addTo(context.map);
    }

    function createMarker(geolocation) {
        let deviceId = geolocation.deviceKey;

        if (isFiltered(geolocation)) {
            let marker = decodeMarker(geolocation)
            util.set(context.markerMap, deviceId, marker)

            if (mapOptions.mobileViewEnabled) {
                context.map.setView([geolocation.latitude, geolocation.longitude]);
            }
        }
    }

    function updateMarker(geolocation) {
        let deviceId = geolocation.deviceKey;

        if (isFiltered(geolocation)) {
            let marker = util.getValue(context.markerMap, deviceId)
            if (geolocation.latitude && geolocation.longitude) {
                marker.setLatLng([geolocation.latitude, geolocation.longitude])
            }

            let content = decodePopup(geolocation)
            marker.bindPopup(content)

            if (mapOptions.mobileViewEnabled) {
                context.map.setView([geolocation.latitude, geolocation.longitude]);
            }
        }
    }

    function decodeMarker(geolocation) {
        if (context.predicates.length === 0) {
            return _decodeMarker(geolocation)
        } else {
            let pass = true;
            for (let i = 0; i < context.predicates.length; i++) {
                if (!context.predicates[i](geolocation)) {
                    pass = false;
                    break
                }
            }

            if (pass) {
                return _decodeMarker(geolocation)
            }
        }
    }

    function _decodeMarker(geolocation) {
        if (geolocation.latitude && geolocation.longitude) {
            let popupContent = decodePopup(geolocation)
            let markerIcon

            if (geolocation.engineOn) {
                markerIcon = L.divIcon({
                    html: '<div class="plate_rectangle">\n' +
                        '  <div class="blue_tr">\n' +
                        '   TR\n' +
                        '  </div>\n' +
                        ' <h5 class="plate_number"> + ' + geolocation.vehiclePlate + '</h5>\n' +
                        ' </div>\n',
                });
            } else {
                markerIcon = L.divIcon({
                    html: '<div class="plate_rectangle">\n' +
                        '  <div class="red_tr">\n' +
                        '   TR\n' +
                        '  </div>\n' +
                        ' <h5 class="plate_number"> + ' + geolocation.vehiclePlate + '</h5>\n' +
                        ' </div>\n',
                });
            }

            if (mapOptions.responsivePopupEnabled) {
                let marker = L.marker([geolocation.latitude, geolocation.longitude], {
                    icon: markerIcon
                }).bindPopup(L.responsivePopup().setContent(popupContent));

                if (mapOptions.markerClusterEnabled) {
                    context.markerCluster.addLayer(marker)
                } else {
                    marker.addTo(context.map)
                }

                return marker;
            } else {
                let marker =  L.marker([geolocation.latitude, geolocation.longitude], {
                    icon: markerIcon
                }).bindPopup(popupContent);

                if (mapOptions.markerClusterEnabled) {
                    context.markerCluster.addLayer(marker)
                } else {
                    marker.addTo(context.map)
                }

                return marker;
            }
        }
    }

    function addMarker(coordinate){
        let marker =  L.marker(coordinate).addTo(context.map)
        return marker;
    }

    function decodePopup(geolocation) {
        let content = ''
        if (geolocation.deviceKey) {
            content += '<p><strong>Cihaz No: </strong>' + geolocation.deviceKey + '<br/>'
        }

        if (geolocation.vehiclePlate) {
            content += '<p><strong>Plaka: </strong>' + geolocation.vehiclePlate + '<br/>'
        }

        if (typeof geolocation.engineOn !== 'undefined') {
            content += '<p><strong>Kontak : </strong>'
            if (geolocation.engineOn) {
                content += 'Açık' + '<br/>'
            } else {
                content += 'Kapalı' + '<br/>'
            }
        }

        if (geolocation.lastEngineActivity) {
            content += '<p><strong>Son Kontak Hareketi: </strong>' + geolocation.lastEngineActivity + '<br/>'
        }

        if (geolocation.localDateTime) {
            content += '<p><strong>Tarih: </strong>' + geolocation.localDateTime + '<br/>'
        }

        if (geolocation.lastActivity) {
            content += '<p><strong>Son Etkinlik: </strong>' + geolocation.lastActivity + '<br/>'
        }

        if (geolocation.latitude && geolocation.longitude) {
            let coordinate = geolocation.latitude + "" + geolocation.longitude
            if (geolocation.altitude) {
                coordinate += "," + geolocation.altitude;
            }
            content += '<p><strong>Koordinat: </strong>' + coordinate + '<br/>'
        }

        if (geolocation.distance) {
            content += '<p><strong>Mesafe: </strong>' + geolocation.distance + '<br/>'
        }

        if (geolocation.speed) {
            content += '<p><strong>Hız: </strong>' + geolocation.speed + '<br/>'
        }

        if (geolocation.course) {
            content += '<p><strong>Açı: </strong>' + geolocation.course + '<br/>'
        }

        if (geolocation.satellites) {
            content += '<p><strong>Uydu Kullanım: </strong>' + geolocation.satellites + '<br/>'
        }

        content += '</p>'
        return content
    }

    const util = {
        has: function (map, element) {
            return (map && map[element]);
        },

        set: function (map, key, value) {
            return map[key] = value;
        },

        foreach: function (object, callback) {
            for (const property in object) {
                if (object.hasOwnProperty(property)) {
                    callback(property, object[property]);
                }
            }
        },

        getKey: function (map, value) {
            for (const prop in map) {
                if (map.hasOwnProperty(prop)) {
                    if (map[prop] === value)
                        return prop;
                }
            }
        },

        getValue: function (map, key) {
            return map[key]
        },

        jsonToMap: function (json) {
            const $json = JSON.parse(json);
            const literal = {};

            for (const key in $json) {
                literal[key] = $json[key];
            }

            return literal;
        }
    };

    return {
        initMap: (properties) => {
            for (const option in properties) {
                mapOptions[option] = properties[option]
            }

            context.map = L.map(mapOptions.elementId).setView(mapOptions.coordinate, mapOptions.zoom);
            L.tileLayer(mapOptions.tileLayer).addTo(context.map);
        },

        enableGeoman: (options) => {
            for (const option in options) {
                geoman[option] = options[option]
            }

            context.map.pm.addControls(geoman);
            mapOptions.geomanEnabled = true
        },

        enablePolylineMeasure: (options) => {
            for (const option in options) {
                polylineMeasure[option] = options[option]
            }

            L.control.polylineMeasure(polylineMeasure).addTo(context.map);
            mapOptions.polylineMeasureEnabled = true
        },

        enableMarkerCluster: (options) => {
            context.markerCluster = L.markerClusterGroup(options)
            mapOptions.markerClusterEnabled = true
        },

        enableResponsivePopup: () => {
            mapOptions.responsivePopupEnabled = true
        },

        enableZoomBox: () => {
            context.map.addControl(L.control.zoomBox({modal: true}))
        },

        enableMobileView: () => {
            mapOptions.mobileViewEnabled = true
        },

        disableFilter: () => {
            mapOptions.filterEnabled = false
        },

        setFilteredDevices: (devices) => {
            context.filteredDevices = devices
        },

        setFilteredDevicesByIgnition: (devices) => {
            context.filteredByIgnition = devices
        },

        setFilteredDevicesByMaxSpeed: (devices) => {
            context.filteredByMaxSpeed = devices
        },

        addPolyline: (polylineString) => {
            addPolyline(polylineString)
        },

        addMarker: (geolocation) => {
            addMarker(geolocation)
        },

        setPredicates: (predicates) => {
            context.predicates = predicates
        },

        getLeafletMap: () => {
            return context.map
        },

        /**
         * websocketOptions::url,
         * websocketOptions::username,
         * websocketOptions::password,
         * websocketOptions::subscriptions,
         * websocketOptions::broker
         *
         * @param websocketOptions
         */
        connect: (websocketOptions) => {
            for (const option in websocketOptions) {
                websocket[option] = websocketOptions[option]
            }

            if (websocket.url && websocket.username && websocket.password) {
                const SockJsAdapter = new SockJS(websocket.url);
                const StompClient = Stomp.over(SockJsAdapter);
                StompClient.connect({login: websocket.username, passcode: websocket.password}, function (frame) {
                    StompClient.subscribe(websocket.broker, function (event) {
                        let json = JSON.parse(event.body);
                        if (Array.isArray(json)) {
                            for (let i = 0; i < json.length; i++) {
                                const GeoLocation = json[i];
                                if (util.has(context.markerMap, GeoLocation.deviceKey)) {
                                    updateMarker(GeoLocation)
                                } else {
                                    createMarker(GeoLocation)
                                }
                            }
                        } else {
                            if (util.has(context.markerMap, json.deviceKey)) {
                                updateMarker(json)
                            } else {
                                createMarker(json)
                            }
                        }
                    });

                    if (mapOptions.markerClusterEnabled) {
                        context.map.addLayer(context.markerCluster);
                    }
                });

                StompClient.debug = null
                return StompClient
            } else {
                throw new Error("Check url,uname,password,broker.")
            }
        }
    };
})

export default ConnectJs