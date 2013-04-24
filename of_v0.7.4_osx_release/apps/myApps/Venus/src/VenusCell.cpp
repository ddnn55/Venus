//
//  Cell.cpp
//  JointExample
//
//  Created by David Stolarsky on 4/24/13.
//
//

#include "VenusCell.h"



VenusCell::VenusCell(ofxBox2d & box2d, ofVec2f pos)
{
    circle.setPhysics(3.0, 0.53, 0.1);
    circle.setup(box2d.getWorld(), pos.x, pos.y, 8);
}