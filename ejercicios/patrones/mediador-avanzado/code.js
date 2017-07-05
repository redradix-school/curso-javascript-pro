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
		this.el.click(this.onClick.bind(this))
	}
	onClick() {
		this.mediator.send(this.nombre + ':clicked')
	}
}

class Toggle extends Component {
	constructor(nombre, selector) {
		super(arguments)
		this.nombre = nombre
		this.el = $(selector)
		this.el.change(this.onChange.bind(this))
	}
	onChange() {
		var state = this.el.attr('checked') ? 'on' : 'off'
		this.mediator.send(this.nombre + ':' + state)
	}
}

class Display extends Component {
	constructor(selector) {
		super(arguments)
		this.el = $(selector)
	}
	update(value) {
		this.el.html(value)
	}
}

class Counter {
	constructor(start) {
		this.count = start
	}
	increment() {
		this.count++
	}
	decrement() {
		this.count--
	}
	getCurrentValue() {
		return this.count
	}
}

// Inicialización

$(function() {
	var mediator = new Mediator(function(mediator) {
		var button1 = new Button('inc', '#button-1'),
			button2 = new Button('dec', '#button-2'),
			display = new Display('#big-display'),
			toggle = new Toggle('ignore', '#ignore'),
			count = new Counter(0),
			enabled = true

		mediator.addComponent(button1)
		mediator.addComponent(button2)
		mediator.addComponent(toggle)
		mediator.addComponent(display)

		mediator.on('ignore:on', function() {
			enabled = false
		})

		mediator.on('ignore:off', function() {
			enabled = true
		})

		mediator.on('inc:clicked', function() {
			if (enabled) {
				count.increment()
			}
			display.update(count.getCurrentValue())
		})

		mediator.on('dec:clicked', function() {
			if (enabled) {
				count.decrement()
			}
			display.update(count.getCurrentValue())
		})
	})
})
