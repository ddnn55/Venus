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

function Cell(x, y, radius, isSensitive) {
  this.bonds = [];

  this.isSensitive = isSensitive;

  var fixDef = new b2FixtureDef;
  fixDef.density = 1.0;
  fixDef.friction = 0.5;
  fixDef.restitution = 0.2;
  fixDef.shape = new b2CircleShape(radius);

  var bodyDef = new b2BodyDef;
  bodyDef.type = b2Body.b2_dynamicBody;
  bodyDef.position.x = x;
  bodyDef.position.y = y;

  this.body = world.CreateBody(bodyDef);
  this.body.CreateFixture(fixDef);
  this.body.SetUserData(this);
}

Cell.prototype.update = function(now) {
  if('animation' in this) {
    var progress = (now - this.animation.start.time) / (this.animation.end.time - this.animation.start.time);
    this.body.GetFixtureList().GetShape().SetRadius( this.animation.start.radius + progress * (this.animation.end.radius - this.animation.start.radius) );
    this.body.SetAwake(true);

    if(now >= this.animation.end.time)
      delete this.animation;
  }

}

Cell.prototype.Touched = function(something) {
  if (this.isSensitive)
    this.Contract(this);
}

Cell.prototype.Contract = function(sender) {

  var now = Date.now() / 1000.0;

  this.animation = {
    start : {
      time : now,
      radius : this.body.GetFixtureList().GetShape().GetRadius()
    },
    end : {
      time : now + Venus.ContractTime,
      radius : 0.5
    }
  };

  for (var b in this.bonds) {
    if (this.bonds[b] !== sender)
      this.bonds[b].Contract(this);
  }
}