const routes = {
   

    app : "/",
    
    operatorList: "/operator-list",
    operatorCreate: "/operator-create",
    operatorEdit: "/operator-edit/:id",
    operatorView: "/operator-view/:id",

    routeList: "/route-list",
    routeCreate: "/route-create",
    routeEdit: "/route-edit/:id",
    routeView: "/route-view/:id",

    busList: "/bus-list",
    busCreate: "/bus-create",
    busEdit: "/bus-edit/:id",

    scheduleList: "/schedule-list",
    scheduleCreate: "/schedule-create",
    scheduleEdit: "/schedule-edit/:id",

    permitList : "/permit-list",
    permitCreate : "/permit-create",
    permitEdit : "/permit-edit/:id",

    reservationList : "/reservation-list",
    reservationCreate : "/reservation-create",
    reservationEdit : "/reservation-edit/:id",
    reservationConfirm : "/reservation-confirm/:id",
    reservationPayment : "/reservation-payment/:id",


    myBookings :"/my-bookings",
    
    login : "/login",
    register : "/register"

  };

  
  export default routes;
  