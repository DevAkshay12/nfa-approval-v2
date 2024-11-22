sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'nfaapproval/test/integration/FirstJourney',
		'nfaapproval/test/integration/pages/tab1List',
		'nfaapproval/test/integration/pages/tab1ObjectPage'
    ],
    function(JourneyRunner, opaJourney, tab1List, tab1ObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('nfaapproval') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThetab1List: tab1List,
					onThetab1ObjectPage: tab1ObjectPage
                }
            },
            opaJourney.run
        );
    }
);