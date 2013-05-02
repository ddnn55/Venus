var   b2Vec2 = Box2D.Common.Math.b2Vec2
   ,  b2AABB = Box2D.Collision.b2AABB
	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
	,	b2Body = Box2D.Dynamics.b2Body
	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	,	b2Fixture = Box2D.Dynamics.b2Fixture
	,	b2World = Box2D.Dynamics.b2World
	,	b2MassData = Box2D.Collision.Shapes.b2MassData
	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
       ,	b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
       ,	b2DistanceJointDef =  Box2D.Dynamics.Joints.b2DistanceJointDef
   ;

function Fly(x, y, radius) {
   this.img = new Image();   // Create new img element
   this.img.src = 'FLY.gif'; // Set source path

   var fixDef = new b2FixtureDef;
   fixDef.density = 1.0;
   fixDef.friction = 0.5;
   fixDef.restitution = 0.2;
   fixDef.shape = new b2CircleShape(
      radius
   );

   var bodyDef = new b2BodyDef;
   bodyDef.type = b2Body.b2_dynamicBody;
   bodyDef.position.x = x;
   bodyDef.position.y = y;
   
   this.body = world.CreateBody(bodyDef);
   this.body.CreateFixture(fixDef);
   this.body.SetUserData(this);
}

Fly.prototype.Draw = function(ctx) {
  ctx.drawImage(this.img, this.body.GetPosition().x, this.body.GetPosition().y);
}