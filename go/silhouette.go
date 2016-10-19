package main

import (
	"fmt"
	"regexp"
	"strings"
	"unicode"

	"github.com/bep/gr"
	"github.com/bep/gr/el"
	"github.com/bep/gr/evt"
)

var (
	textBlocks  = []TextBlock{}
	regTallBox  = regexp.MustCompile(`[bdhklt]`)
	regLowBox   = regexp.MustCompile(`[gjpqy]`)
	regSmallBox = regexp.MustCompile(`[aceimnorsuvwxz]`)
)

const (
	initialSize = 24
	letterF     = "f"
)

func main() {
	component := gr.New(new(sentence))
	gr.RenderLoop(func() {
		component.Render("reactive-silhouette", gr.Props{})
	})
}

type sentence struct {
	*gr.This
}

type TextBlock struct {
	text     string
	showText bool
}

// Implements the StateInitializer interface.
func (c sentence) GetInitialState() gr.State {
	return gr.State{
		"sentence":      "F is a difficult letter to write you know.",
		"showPlainText": false,
		"hideInput":     false,
		"scaling":       100,
		"update":        true,
	}
}

func StyleName(char rune) string {
	if unicode.IsUpper(char) {
		return "uppercase boxedLetter"
	} else if string(char) == letterF {
		return "fBox boxedLetter"
	} else {
		if regSmallBox.MatchString(string(char)) {
			return "smallestBox boxedLetter"
		}
		if regLowBox.MatchString(string(char)) {
			return "lowBox boxedLetter"
		}
		if regTallBox.MatchString(string(char)) {
			return "tallBox boxedLetter"
		}
	}
	println("Unclassified", string(char))
	return "unclassified"
}

func MinHeight(char rune, scale float32) int {
	adjustedHeight := float32(1.0)
	if string(char) == letterF {
		adjustedHeight = 2
	} else if unicode.IsUpper(char) {
		adjustedHeight = 1.5
	} else if regTallBox.MatchString(string(char)) {
		adjustedHeight = 1.5
	} else if regLowBox.MatchString(string(char)) {
		adjustedHeight = 1.5
	} else {
		adjustedHeight = 1
	}
	return int(adjustedHeight * initialSize * (1 + scale/100))
}

func RelativeTop(char rune, scale float32) int {
	top := float32(0.0)
	if string(char) == letterF {
		top = 0.5
	} else if regTallBox.MatchString(string(char)) {
		top = 0.0
	} else if regLowBox.MatchString(string(char)) {
		top = 0.5
	} else {
		top = 0
	}
	return int(top * initialSize * (1 + scale/100))
}

func MinWidth(char rune, scale float32) int {
	return int(initialSize * (1 + scale/100))
}

func Box(char rune, transform float32) *gr.Element {
	if string(char) == "\n" {
		return el.Break()
	} else if !unicode.IsLetter(char) {
		return el.Div(
			gr.CSS("inline"),
			gr.CSS("plainText"),
			gr.Text(string(char)),
		)
	}
	return el.Div(
		gr.Style("top", fmt.Sprintf("%dpx", RelativeTop(char, transform))),
		gr.Style("min-width", fmt.Sprintf("%dpx", MinWidth(char, transform))),
		gr.Style("min-height", fmt.Sprintf("%dpx", MinHeight(char, transform))),
		gr.CSS("boxedLetter"),
	)
}

func Boxes(sentence string, transform float32) *gr.Element {
	root := el.Div(
		gr.CSS("sentence"),
		gr.Style("font-size", fmt.Sprintf("%dpx", int((initialSize+40)*(1+transform/100)))),
	)
	for _, line := range strings.Split(sentence, "\n") {
		splitted := strings.Split(line, " ")
		for _, word := range splitted {
			wordBox := el.Div(
				gr.CSS("word"),
				gr.Style("margin-right", fmt.Sprintf("%dpx", int(initialSize*transform/100))),
				//			gr.Style("margin-bottom", fmt.Sprintf("%dpx", int(0.5*initialSize*(1+(transform/100))))),
			)
			for _, v := range word {
				box := Box(v, transform)
				box.Modify(wordBox)
			}
			wordBox.Modify(root)
		}
		el.Break().Modify(root)
	}

	return root
}

// Implements the Renderer interface.
func (c sentence) Render() gr.Component {
	sentence := c.State().String("sentence")
	showPlainText := c.State().Bool("showPlainText")
	hideInput := c.State().Bool("hideInput")
	scaling := float32(c.State().Int("scaling"))

	var boxedSentence = el.Div(
		gr.CSS("plainText"),
		gr.Style("font-size", fmt.Sprintf("%dpx", int((initialSize+30)*(1+scaling/100)))),
		gr.Text(sentence),
	)

	if !showPlainText {
		boxedSentence = Boxes(sentence, scaling)
	}

	var display = ""
	if hideInput {
		display = "none"
	}

	elem := el.Div(
		el.Span(
			gr.Text("Hide input"),
			el.Input(
				gr.Prop("type", "checkbox"),
				evt.Click(func(event *gr.Event) {
					fmt.Println("check hide changed", event.TargetValue())
					c.SetState(gr.State{"hideInput": !hideInput})
				}),
			),
		),
		el.Span(
			gr.Text("Show plain text"),
			gr.Style("display", display),
			el.Input(
				gr.Prop("type", "checkbox"),
				evt.Click(func(event *gr.Event) {
					fmt.Println("check plain changed", event.TargetValue())
					c.SetState(gr.State{"showPlainText": !showPlainText})
				}),
			),
		),
		el.Span(
			gr.Text("Scaling"),
			gr.Style("display", display),
			el.Input(
				gr.Prop("type", "number"),
				gr.Prop("value", c.State().Int("scaling")),
				evt.Change(func(event *gr.Event) {
					c.SetState(gr.State{"scaling": event.TargetValue()})
				}),
			),
		),
		el.TextArea(
			gr.Style("display", display),
			gr.Style("color", "orange"),
			gr.Style("width", "100%"),
			gr.Text(sentence),
			evt.Change(func(event *gr.Event) {
				fmt.Println("text changed")
				c.SetState(gr.State{"sentence": event.TargetValue()})
			})),
		el.Button(
			gr.Style("display", display),
			gr.Text("Add block"),
			evt.Click(func(event *gr.Event) {
				textBlocks = append(textBlocks, TextBlock{text: sentence, showText: showPlainText})
				c.SetState(gr.State{"update": !c.State().Bool("update")})
			}),
		),
		el.Button(
			gr.Style("display", display),
			gr.Text("Clear blocks"),
			evt.Click(func(event *gr.Event) {
				textBlocks = []TextBlock{}
				c.SetState(gr.State{"update": !c.State().Bool("update")})
			}),
		),
		boxedSentence,
		renderBoxes(textBlocks, scaling),
	)

	return elem
}

func renderBoxes(boxcontents []TextBlock, scaling float32) *gr.Element {
	if len(boxcontents) == 0 {
		return el.Div()
	}
	root := el.Div(
		gr.CSS("sentence"),
		gr.CSS("plainText"),
		gr.Style("font-size", fmt.Sprintf("%dpx", int((initialSize+30)*(1+scaling/100)))),
	)

	for i := len(textBlocks) - 1; i >= 0; i-- {
		box := textBlocks[i]
		if box.showText {
			el.Div(
				gr.Style("transform", scaling),
				gr.Text(box.text),
			).Modify(root)
		} else {
			Boxes(box.text, scaling).Modify(root)
		}
	}

	return root
}

// Implements the ShouldComponentUpdate interface.
func (c sentence) ShouldComponentUpdate(next gr.Cops) bool {
	return c.State().HasChanged(next.State, "sentence") ||
		c.State().HasChanged(next.State, "showPlainText") ||
		c.State().HasChanged(next.State, "scaling") ||
		c.State().HasChanged(next.State, "update") ||
		c.State().HasChanged(next.State, "hideInput")

}
