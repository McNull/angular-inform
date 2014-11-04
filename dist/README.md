# [angular-inform](https://github.com/McNull/angular-inform)
A small growl-like easy-to-use message toaster for angular.

#### Dependencies
Besides AngularJS (~1.2.4), none.

#### Browser Support

Tested under _Internet Explorer 8+_, _Chrome 34+_, _FireFox 28+_ and _Safari 7+_. The styling should work on any _decent_ mobile device.

#### Demo

Either visit [this Plunker](http://plnkr.co/edit/x0sJj8) page or clone this repository locally and run a http-server from the `public` folder.

Installation
============

The latest version can be installed via _bower_ from the command line.

    $ bower --save install angular-inform
    
Include both the _JavaScript_ and _CSS_ in your _HTML_.

```
<link rel="stylesheet" href="bower_components/dist/angular-inform.min.css"/>
<!-- After AngularJS -->
<script src="bower_components/dist/angular-inform.min.js"></script>
```

Make your main angular module dependent of the `inform` module.

    angular.module('myApp', ['inform']);

Insert the `inform` directive somewhere in your _HTML_.

```
<div inform></div>
```

### Optional Installation Steps

Provide the element the `inform-fixed` class if you want the messages to float at the upper left position.

```
<div inform class="inform-fixed"></div>
```

Provide the element the `inform-fixes` and `inform-center` to display the messages in the center of the screen.

```
<div inform class="inform-fixed inform-center"></div>
```

Provide the element the `inform-shadow` to give the messages a light box-shadow.

```
<div inform class="inform-shadow"></div>
```

#### Unhandled Exceptions

Make your main angular module dependent of the `inform-exception` module if you want _unhandled exceptions_ to be displayed in the notification list.

    angular.module('myApp', ['inform', 'inform-exception']);

Make your main angular module dependent of the `inform-http-exception` module if you want _http exceptions_ to be displayed in the notification list.

    angular.module('myApp', ['inform', 'inform-http-exception']);

#### Animations

Install `angular-animate` and provide the element the `inform-animate` class if you want to have CSS3 animations.

```
# Install angular-animate
$ bower install angular-animate

// Enable ngAnimate in your module
angular.module('myApp', ['inform', 'ngAnimate']);

<!-- Set the animation class -->
<div inform class="inform-animate"></div>
```

Usage
=====

The module exposes an injectable service by the name `inform`, which allows you to add notifications.

```
angular.module('myApp')
  .controller('MyController', function($scope, inform) {
    inform.add('Hello!');
  });
```

Service Methods
===============

#### Add
The `add` methods appends new messages to the list of notifications. The first argument is the message to display and the _optional_ second argument is an object containing some options.

    inform.add('The content of the message', {
      ttl: 2000, type: 'warning'
    });

**Option properties**

The default property values are used if no options are provided. See _configuration_ how to change these default values.

    {
    	/*
    	    The time to live for the message in milliseconds.
    	    Default value is 5000. Specify <0 to make the message sticky.
    	*/
    	ttl: 5000,
    	
        /*
            The type of message to enable styling. 
            Values can be any of the following:
            
            - 'default'
            - 'primary'
            - 'success'
            - 'info'
            - 'warning'
            - 'danger'
            -  or any other custom type.
            
            Default value is 'default'
        */
        type: 'danger'
    }
    
**Flood protection**

To prevent the list from flooding, the method will search the current notification list for a match on content and type. If an earlier message is found, than the _TTL_ of that message will be reset and a track count is increased.

**Return value**

The method will either return a newly created message object or any match found.

#### Remove

Any earlier returned message object can be manually removed from the notification list if needed. This will also cancel any pending TTL timeouts.

    var myMsg = inform.add('My Message');
    inform.remove(myMsg);

#### Clear

This method (no arguments) will simply clear the list of messages.

#### Messages

Returns the array of messages maintained by the service.

Service Configuration
=====================

The defaults of the service can be manipulated in the config phase of your module by injecting the `informProvider`.

    angular.module('myApp')
      .config(function(informProvider) {
      
        var myDefaults = {
          /* default time to live for each notification */
          ttl: 1234,
          /* default type of notification */
          type: 'danger'
        };
        
        informProvider.defaults(myDefaults);
        
      });