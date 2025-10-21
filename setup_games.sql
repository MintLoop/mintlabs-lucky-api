-- Complete games data for MintLabs Lucky Number Generator
-- This includes all major lottery games with their correct parameters

INSERT INTO games (code, name, description, wmin, wmax, wcount, bmin, bmax, bcount) VALUES
-- National Lotteries
('powerball', 'Powerball', 'America''s favorite lottery game', 1, 69, 5, 1, 26, 1),
('megamillions', 'Mega Millions', 'Large jackpot lottery game', 1, 70, 5, 1, 25, 1),

-- California Lottery Games
('ca_superlotto', 'SuperLotto Plus', 'California''s largest lottery game', 1, 47, 5, 1, 27, 1),
('ca_daily3', 'Daily 3', 'California Daily 3 - Pick 3 numbers', 0, 9, 3, NULL, NULL, NULL),
('ca_daily4', 'Daily 4', 'California Daily 4 - Pick 4 numbers', 0, 9, 4, NULL, NULL, NULL),
('ca_fantasy5', 'Fantasy 5', 'California Fantasy 5 - Pick 5 numbers', 1, 39, 5, NULL, NULL, NULL),

-- Texas Lottery
('lotto_texas', 'Lotto Texas', 'Texas state lottery - Pick 6 numbers', 1, 54, 6, NULL, NULL, NULL),

-- New York Lottery
('ny_take5', 'Take 5', 'New York Take 5 - Pick 5 numbers', 1, 39, 5, NULL, NULL, NULL),

-- Canadian Lottery (existing)
('lotto649', 'Lotto 6/49', 'Canadian national lottery', 1, 49, 6, NULL, NULL, NULL)

ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    wmin = EXCLUDED.wmin,
    wmax = EXCLUDED.wmax,
    wcount = EXCLUDED.wcount,
    bmin = EXCLUDED.bmin,
    bmax = EXCLUDED.bmax,
    bcount = EXCLUDED.bcount;
