defmodule MemoryWeb.PageController do
  use MemoryWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def game(conn, %{"name" => name}) do
    render conn, "game.html", name: name
    #redirect conn, to: "/game/:name"
  end

  def game_form(conn, %{"name" => name}) do
    redirect conn, to: "/game/" <> name
  end
end
