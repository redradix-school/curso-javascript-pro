class Component {
	setMediator(mediator) {}
}

class Mediator {
	constructor(fn) {}
	on(msg, cb) {}
	send(msg) {}
	addComponent(component) {}
}

// Componentes

class Button extends Component {
	constructor(nombre, selector) {
		super(arguments)
		this.nombre = nombre
		this.el = $(selector)
		this.el.click(bind(this, this.onClick))
	}
	onClick() {
		this.mediator.send(this.nombre + ':clicked')
	}
}

// Inicialización

$(function() {
	var mediator = new Mediator(),
		button1 = new Button('pulsador', '#button-1')

	mediator.addComponent(button1)
	mediator.on('pulsador:clicked', function() {
		alert('hola?')
	})
})
