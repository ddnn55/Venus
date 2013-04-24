#include "testApp.h"



//--------------------------------------------------------------
void testApp::setup() {
	
	ofSetVerticalSync(true);
	ofBackgroundHex(0xfdefc2);
	ofSetLogLevel(OF_LOG_NOTICE);

	box2d.init();
	box2d.setGravity(0, 0);
	box2d.setFPS(60.0);
	box2d.registerGrabbing();
	
    int rows = 2,
        cols = 10;
    
	// first we add just a few circles
	for (int r=0; r<rows; r++) {
        cellsGrid.push_back(vector< tr1::shared_ptr<VenusCell> >());
        for (int c=0; c<cols; c++) {

            tr1::shared_ptr<VenusCell> cell(new VenusCell(box2d, ofVec2f(ofGetWidth()/2 + c * 25, ofGetHeight()/2 + r * 25)));
            
            cellsGrid[r].push_back(cell);
            cells.push_back(cell);
        }
	}
	
	// now connect each circle with a joint
    for (int r=0; r<rows; r++) {
        for (int c=0; c<cols; c++) {
		
            if(r > 0)
            {
                ofxBox2dJoint joint1;
                joint1.setup(box2d.getWorld(), cellsGrid[r][c]->circle.body, cellsGrid[r-1][c]->circle.body);
                joint1.setLength(25);
                joints.push_back(joint1);
            }
            
            if(c > 0)
            {
                ofxBox2dJoint joint2;
                joint2.setup(box2d.getWorld(), cellsGrid[r][c]->circle.body, cellsGrid[r][c-1]->circle.body);
                joint2.setLength(25);
                joints.push_back(joint2);
            }
        }
	}
}

//--------------------------------------------------------------
void testApp::update() {
	box2d.update();	
}


//--------------------------------------------------------------
void testApp::draw() {
	
	ofSetHexColor(0xf2ab01);
	
	for(int i=0; i<cells.size(); i++) {
		ofFill();
		ofSetHexColor(0x01b1f2);
		cells[i]->circle.draw();
	}
	
	for(int i=0; i<joints.size(); i++) {
		ofSetHexColor(0x444342);
		joints[i].draw();
	}
	
	string info = "";
	info += "click and pull the chain around\n";
	info += "spacebar -- trigger bite\n";
	info += "FPS: "+ofToString(ofGetFrameRate(), 1)+"\n";
	ofSetHexColor(0x444342);
	ofDrawBitmapString(info, 30, 30);
}

//--------------------------------------------------------------
void testApp::keyPressed(int key) {
    
    if(key == ' ')
    {
        // bite
        for(int j = 0; j < joints.size(); j++)
        {
            joints[j].setLength(5);
        }
    }
	
	if(key == 't') ofToggleFullscreen();
}

//--------------------------------------------------------------
void testApp::keyReleased(int key) {
}

//--------------------------------------------------------------
void testApp::mouseMoved(int x, int y ) {
	
}

//--------------------------------------------------------------
void testApp::mouseDragged(int x, int y, int button) {
}

//--------------------------------------------------------------
void testApp::mousePressed(int x, int y, int button) {
	
}

//--------------------------------------------------------------
void testApp::mouseReleased(int x, int y, int button) {
}

//--------------------------------------------------------------
void testApp::resized(int w, int h){
}

