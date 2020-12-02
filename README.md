# CONWAY'S GAME OF LIFE

### Background

---

<a name='more-details'></a>
Game of Life was invented by John Horton Conway in 1960 (<a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">more here</a>). Game of Life is a "cellular automation" that takes in an <b>initial state</b>, and then generations are created based on <b>rules of evolution</b>.

### Functionality of the Game

---

A grid is created to represent the space, or world, that each generation lives in. The cells in the grid represent whether a cell is "alive" or "dead". Each turn represents a new generation, which is spawned through evolution based on the living/dead cells from the previous generation.

Rules:
<br>A generic equation for defining a living cell can be written as: R=(E<sub>l</sub>,E<sub>u</sub>,F<sub>l</sub>,F<sub>u</sub>); where:

<ul>
<li>E<sub>l</sub>&#x2264; E &#8804;E<sub>u</sub> = Rules for a LIVING cell to stay ALIVE</li>
<li>F<sub>l</sub>&#x2264; F &#8804;F<sub>u</sub> = Rules for a DEAD cell to become ALIVE</li>
<li>E<sub>l</sub> & F<sub>l</sub> = Lower limit</li>
<li>E<sub>u</sub> & F<sub>u</sub> = Upper Limit</li>
</ul>

At each step in time (generation), the following transitions occur for evolution:

<ol>
        <li>
          Any living cell with fewer than E<sub>l</sub> alive neighbours dies
          <i>(underpopulation)</i>.
        </li>
        <li>
          Any living cell within E<sub>l</sub> or E<sub>u</sub> alive neighbours
          lives on to the next generation.
        </li>
        <li>
          Any living cell with more than E<sub>u</sub> alive neighbours dies<i>(overpopulation)</i>.
        </li>
        <li>
          Any dead cell within F<sub>l</sub> and F<sub>u</sub> alive neighbours
          becomes a live cell<i>(reproduction)</i>.
        </li>
</ol>

Conway's Game of Life follows the R=(2333) rules, which compare the behavior of the automaton to real life and can be condensed into the following:

<ol>
  <li>Any live cell with two or three live neighbours survives.</li>
  <li>Any dead cell with three live neighbours becomes a live cell.</li>
  <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
</ol>

## My Project

This is a project I took on to implement Conway's "Game of Life" (<a href='#more-details'>more details below</a>). The original Game of Life is based in a 2 dimensional grid to simulate the evolution of generations. My project consists of both a 2D and 3D version of the Game of Life.

In both the 2D and 3D versions of this project, the user can control the settings that the game runs on (the El/Eu/Fl/Fu limits, preset patterns, color style, grid size, generation speed, etc.), and can run the game controls (play, stop, shuffle, etc.). The only real differences between the controls between the 2D and 3D versions are:

<ul>
<li>2D: allows cells to be clickable by the user.</li>
<li>3D: allows the cube/grid/world to be rotated for a better view.</li>
</ul>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Fully deployed site located at: https://game-of-life-bk.vercel.app/
