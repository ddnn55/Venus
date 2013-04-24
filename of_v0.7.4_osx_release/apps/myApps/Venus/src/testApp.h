#pragma once
#include "ofMain.h"
#include "ofxBox2d.h"

#include "VenusCell.h"

#include <tr1/memory>

// -------------------------------------------------

class testApp : public ofBaseApp {
	
public:
	
	void setup();
	void update();
	void draw();
	
	void keyPressed(int key);
	void keyReleased(int key);
	void mouseMoved(int x, int y);
	void mouseDragged(int x, int y, int button);
	void mousePressed(int x, int y, int button);
	void mouseReleased(int x, int y, int button);
	void resized(int w, int h);
	
	ofxBox2d						box2d;			  //	the box2d world
	ofxBox2dCircle					anchor;			  //	fixed anchor
	vector		< vector< tr1::shared_ptr<VenusCell> > >	cellsGrid;
	vector		< tr1::shared_ptr<VenusCell> >	cells;
	vector		<ofxBox2dJoint>		joints;			  //	joints
	
};

