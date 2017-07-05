class Component {
	setMediator(mediator) {
		this.mediator = mediator
	}
}

class Mediator {
	constructor(fn) {
		this.connections = {}
		if (fn) fn(this)
	}
	on(msg, cb) {
		this.connections[msg] = cb
	}
	send(msg) {
		var args = [].slice.call(arguments, 1),
			action = this.connections[msg]
		if (action) action.apply({}, args)
	}
	addComponent(component) {
		component.setMediator(this)
	}
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
