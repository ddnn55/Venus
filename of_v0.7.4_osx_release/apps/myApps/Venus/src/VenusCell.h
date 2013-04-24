//
//  Cell.h
//  JointExample
//
//  Created by David Stolarsky on 4/24/13.
//
//

#ifndef __JointExample__Cell__
#define __JointExample__Cell__

#include "ofxBox2d.h"

class VenusCell
{
public:
    VenusCell(ofxBox2d & box2d, ofVec2f pos);
    ofxBox2dCircle circle;
};

#endif /* defined(__JointExample__Cell__) */
