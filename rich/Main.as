package  {
	
	import flash.display.MovieClip;
	import flash.text.TextField;
	import flash.sensors.Accelerometer;
	import flash.events.AccelerometerEvent;
	import flash.utils.setInterval;
	import flash.events.Event;
	
	
	public class Main extends MovieClip {
		
		public var alphaTxt:TextField;
		public var betaTxt:TextField;
		public var gammaTxt:TextField;

		public var ball1:MovieClip;
		public var ball2:MovieClip;
		public var ball3:MovieClip;
		
		var velX:Number;
		var velY:Number;

		var acc1:Accelerometer;
		var isSupported:Boolean;
		
		public function Main() {
			// constructor code
			this.addEventListener(Event.ADDED_TO_STAGE, onStageAdd, false, 0, true);
		}
		
		public function checkSupport():void
		{
			if(isSupported){
				trace("Accelerometer is supported");
				acc1.addEventListener(AccelerometerEvent.UPDATE, updateHandler, false, 0, false);
			} else {
				trace("Accelerometer is not supported");
			}
		}
		
		public function updateHandler(e:AccelerometerEvent):void
		{	
			velX = e.accelerationX * 10;
			velY = e.accelerationY * 10;
			
			alphaTxt.text = e.accelerationX.toString();
			betaTxt.text = e.accelerationY.toString();
			gammaTxt.text = e.accelerationZ.toString();
		}
		
		public function loop(){
			ball1.x -= velX;
			ball1.y += velY;
		}
		
		public function onStageAdd(e:Event):void
		{
			ball1.scaleX = ball1.scaleY = .5;

			velX = 0;
			velY = 0;

			acc1 = new Accelerometer();
			isSupported = Accelerometer.isSupported;

			checkSupport();
			var ticker = setInterval(loop, 1000/60);
		}
	}
	
}













