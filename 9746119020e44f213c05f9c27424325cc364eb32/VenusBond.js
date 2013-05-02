var b2Vec2 = Box2D.Common.Math.b2Vec2,
  b2AABB = Box2D.Collision.b2AABB,
  b2BodyDef = Box2D.Dynamics.b2BodyDef,
  b2Body = Box2D.Dynamics.b2Body,
  b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
  b2Fixture = Box2D.Dynamics.b2Fixture,
  b2World = Box2D.Dynamics.b2World,
  b2MassData = Box2D.Collision.Shapes.b2MassData,
  b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
  b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
  b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
  b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
  b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;

function Bond(cellA, cellB, angle) {
  cellA.bonds.push(this);
  cellB.bonds.push(this);

  this.cellA = cellA;
  this.cellB = cellB;
  this.angle = angle;

  var j = new b2DistanceJointDef();
  j.collideConnected = true;
  j.length = 2.0;
  j.dampingRatio = 0.9;
  j.frequencyHz = 2;

  j.bodyA = cellA.body;
  j.bodyB = cellB.body;

  this.joint = world.CreateJoint(j);
}

Bond.prototype.Contract = function(sender) {
  if(this.angle == 0.0) {
    this.joint.SetLength(1.0);
    if (sender === this.cellA)
      this.cellB.Contract(this);
    else
      this.cellA.Contract(this);
  }

}