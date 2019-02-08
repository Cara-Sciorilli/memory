defmodule Memory.Game do
  def new do
    %{
      tiles: next_shuffle(),
      clicks: 0,
    }
  end

  def client_view(game) do
    ts = game.tiles
    cs = game.clicks

    %{
      displayed: get_displayed(ts),
      clicks: cs,
      selected: get_number_selected(ts),
    }
  end

  def check_match(game) do
    two_tiles = Enum.filter game.tiles, fn t -> t[:clicked] end
    if hd(two_tiles)[:value] == hd(tl(two_tiles))[:value] do
      xs = Enum.map game.tiles, fn t ->
            if hd(two_tiles) == t || hd(tl(two_tiles)) == t do
              [{:clicked, false}, {:value, t[:value]}, {:completed, true}]
            else
              t
            end
          end

      game
      |> Map.put(:tiles, xs)
    else
      ys = Enum.map game.tiles, fn u ->
        [{:clicked, false}, {:value, u[:value]}, {:completed, u[:completed]}]
      end

      game
      |> Map.put(:tiles, ys)
    end
  end

  def guess(game, index) do
    t = Enum.at(game.tiles, index)
    xs = List.replace_at(game.tiles, index, [{:clicked, true}, {:value, t[:value]}, {:completed, t[:completed]}])

    game
    |> Map.put(:tiles, xs)
    |> Map.put(:clicks, game.clicks+1)
  end

  def get_displayed(tiles) do
    #map tiles and make list of strings
    Enum.map tiles, fn t ->
      if t[:clicked] || t[:completed] do
        t[:value]
      else
        ""
      end
    end
  end

  def get_number_selected(tiles) do
    selected = Enum.filter tiles, fn t -> t[:clicked] end
    length(selected)
  end

  def next_shuffle do
    tiles = [
      [{:clicked, false}, {:value, "A"}, {:completed, false}],
      [{:clicked, false}, {:value, "G"}, {:completed, false}],
      [{:clicked, false}, {:value, "C"}, {:completed, false}],
      [{:clicked, false}, {:value, "D"}, {:completed, false}],
      [{:clicked, false}, {:value, "C"}, {:completed, false}],
      [{:clicked, false}, {:value, "F"}, {:completed, false}],
      [{:clicked, false}, {:value, "G"}, {:completed, false}],
      [{:clicked, false}, {:value, "H"}, {:completed, false}],
      [{:clicked, false}, {:value, "E"}, {:completed, false}],
      [{:clicked, false}, {:value, "B"}, {:completed, false}],
      [{:clicked, false}, {:value, "A"}, {:completed, false}],
      [{:clicked, false}, {:value, "D"}, {:completed, false}],
      [{:clicked, false}, {:value, "E"}, {:completed, false}],
      [{:clicked, false}, {:value, "F"}, {:completed, false}],
      [{:clicked, false}, {:value, "B"}, {:completed, false}],
      [{:clicked, false}, {:value, "H"}, {:completed, false}]
    ]
    Enum.shuffle(tiles)
  end
end
