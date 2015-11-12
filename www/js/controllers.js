angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage) {

  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('TodoBizCtrl', function($scope, $localStorage, $cordovaVibration, $cordovaLocalNotification) {
  $scope.todobiz = {
    task : ''
  };

  if ($localStorage.biztasks) {
    $scope.tasks = $localStorage.biztasks;
  } else {
    $scope.tasks = ['Biz Task 1', 'Biz Task 2', 'Biz Task 3'];
  }

  $scope.addTask = function() {
    if ($scope.todobiz.task) {

      $scope.tasks.push($scope.todobiz.task);

      $localStorage.biztasks = $scope.tasks;

      $scope.todobiz.task = '';
    } else {
      alert('Please enter a valid todo task!');
    }
  }

  $scope.removeTask = function(index) {
    delete $scope.tasks[index];
      $cordovaVibration.vibrate(100);
    $localStorage.biztasks = $scope.tasks;

  }
    
$scope.updateSingleNotification = function () {
    if($scope.todobiz.tasks.checked){
      $cordovaLocalNotification.update({
        id: 1,
        title: 'Completed',
        text: 'All of your tasks are completed! Congrats!'
      }).then(function (result) {
        $localStorage.biztasks = $scope.tasks
      })};
    };    
  
})

.controller('TodoHomeCtrl', function($scope, $localStorage, $cordovaVibration) {
  $scope.todohome = {
    task : ''
  };

  if ($localStorage.hometasks) {
    $scope.tasks = $localStorage.hometasks;
  } else {
    $scope.tasks = ['Home Task 1', 'Home Task 2', 'Home Task 3'];
  }

  $scope.addTask = function() {
    if ($scope.todohome.task) {

      $scope.tasks.push($scope.todohome.task);

      $localStorage.hometasks = $scope.tasks;

      $scope.todohome.task = '';
    } else {
      alert('Please enter a valid todo task!');
    }
  }

  $scope.removeTask = function(index) {
    delete $scope.tasks[index];
      $cordovaVibration.vibrate(100);
    $localStorage.hometasks = $scope.tasks;

  }
})

.controller('TodoJobsCtrl', function($scope, $localStorage, $cordovaVibration) {
  $scope.todojobs = {
    task : ''
  };

  if ($localStorage.jobstasks) {
    $scope.tasks = $localStorage.jobstasks;
  } else {
    $scope.tasks = ['Jobs Task 1', 'Jobs Task 2', 'Jobs Task 3'];
  }

  $scope.addTask = function() {
    if ($scope.todojobs.task) {

      $scope.tasks.push($scope.todojobs.task);

      $localStorage.jobstasks = $scope.tasks;

      $scope.todojobs.task = '';
    } else {
      alert('Please enter a valid todo task!');
    }
  }

  $scope.removeTask = function(index) {
    delete $scope.tasks[index];
      $cordovaVibration.vibrate(100);
    $localStorage.jobstasks = $scope.tasks;

  }
})

.controller('SettingsCtrl', function($scope, FriendService, $state, $ionicActionSheet, $timeout, $cordovaContacts) { 
  
  $scope.friendsCount = FriendService.all().length;

  $scope.title = 'Settings';

  $scope.showFriends = function() {
    $state.go('tab.friends');
  }
  
  $scope.addContacts = function(){
	ionicPlatform.ready(function(){	
	$cordovaContacts.find({multiple: true}).then(function(result){
			console.log(result);
});
});
};

  // Triggered on a button click, or some other target
   $scope.show = function() {

     // Show the action sheet
     var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: '<b>Share</b> This' },
         { text: 'Move' }
       ],
       destructiveText: 'Delete',
       titleText: 'Modify your album',
       cancelText: 'Cancel',
       cancel: function() {
            hideSheet();
          },
       buttonClicked: function(index) {
         hideSheet();
         if (index === 0) {
             alert('Share Clicked...');
         } else if (index === 1) {
            alert('Move Clicked...');
         }
         return true;
       },
       destructiveButtonClicked: function() {
          hideSheet();
          alert('Delete Clicked...');
       }
     });

   };

})