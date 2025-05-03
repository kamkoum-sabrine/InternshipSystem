package com.example.Back.Auth.Config;

import java.util.Date;
import java.util.List;
import java.util.function.Function;

import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    private final String SECRET_KEY = "secret";
    @Autowired
    private UserRepository userRepository;
   /** public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 jour
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }**/

   public String generateToken(String username) {
       // Récupérer l'utilisateur et ses rôles
       User user = userRepository.findUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

       String role = user.getRole().getNom(); // Récupérer le nom du rôle

       // Ajouter le préfixe ROLE_ avant d'inclure le rôle dans le token
       role = "ROLE_" + role.toUpperCase(); // Ajouter le préfixe ROLE_ et mettre le rôle en majuscules
       //String role = user.getRole().getNom(); // Récupérer le nom du rôle
       return Jwts.builder()
               .setSubject(username)
               .claim("role", role) // Ajouter les rôles dans le token
               .setIssuedAt(new Date())
               .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 jour
               .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // Signature avec la même clé
               .compact();
   }


    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }


    public boolean isTokenValid(String token, String username) {
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser().setSigningKey(SECRET_KEY)
                .parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());
    }
}

/*@Component
public class JwtUtil {

    private static final String SECRET_KEY = "secret";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1h
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}*/
