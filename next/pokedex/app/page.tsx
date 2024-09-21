import { Link, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";

export default async function Page() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const body: { results: { name: string, url: string }[] } = await response.json();

  return (
    <Stack direction='column' padding='2rem' spacing={2}>
      <Typography variant='h1' textAlign='center' paddingTop='3rem'>
        PokeDex
      </Typography>

      <List>
        {body.results.map((pokemon) => (
          <ListItem key={pokemon.name} sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'divider' }}>
            <Link href={`/pokemon/${pokemon.name}`}>
              <ListItemText>
                {pokemon.name}
              </ListItemText>
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
